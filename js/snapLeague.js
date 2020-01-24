// import * as races from "./snap-league-results-pre-alpha.json"
//var races = require("./snap-league-results-pre-alpha.json")

// - Get Races
var races;
let pointConversion = new Map([
    [1, 10],
    [2, 7],
    [3, 5],
    [4, 4],
    [5, 3],
    [6, 2],
    [7, 1],
]);
function convertPlacementToPoints(placement) {
    var _a;
    return _a = pointConversion.get(placement), (_a !== null && _a !== void 0 ? _a : 0);
}
function createLeaderboard(races) {
    let pointLeaderboard = new Map();
    let averageTimeLeaderboard = new Map();
    let averagePointsLeaderboard = new Map();
    let raceTimes = new Map();
    let currentLinealChampion = null;
    races.forEach((race) => {
        let raceRunners = new Set(race.runners.map((runner) => runner.name));
        let runnerPlacements = new Map();
        race.runners.forEach((runner) => {
            var _a, _b, _c;
            let runnerName = runner.name;
            let runnerPlacement = runner.placement;
            let runnerPoints = convertPlacementToPoints(runnerPlacement);
            let initialPoints = (_a = pointLeaderboard.get(runnerName), (_a !== null && _a !== void 0 ? _a : 0));
            pointLeaderboard.set(runnerName, initialPoints + runnerPoints);
            let runnerTime = runner.time;
            let runnerTimes = (_b = raceTimes.get(runnerName), (_b !== null && _b !== void 0 ? _b : []));
            runnerTimes.push(runnerTime);
            raceTimes.set(runnerName, runnerTimes);
            averageTimeLeaderboard.set(runnerName, runnerTimes.reduce((totalTime, time) => totalTime + time, 0) / runnerTimes.filter((time) => time > 0).length);
            averagePointsLeaderboard.set(runnerName, ((_c = pointLeaderboard.get(runnerName), (_c !== null && _c !== void 0 ? _c : 0)) / runnerTimes.length).toFixed(2));
            runnerPlacements.set(runnerName, runnerPlacement);
            if (currentLinealChampion == null && runnerPlacement == 1) {
                currentLinealChampion = runnerName;
            }
            if (raceRunners.has(currentLinealChampion) && runnerPlacement == 1) {
                currentLinealChampion = runnerName;
            }
        });
    });
    return [pointLeaderboard, averageTimeLeaderboard, averagePointsLeaderboard, currentLinealChampion];
}

// ! Order by Points, write into table
// ! Write into table in loop

function drawTable(pointLeaderboard, averageTimeLeaderboard, currentLinealChampion) {

  // Order map by points
  var sortedPointLeaderboard = new Map([...pointLeaderboard.entries()].sort((a, b) => {
    return a[1] - b[1];
  }).reverse());

  // creates a <table> element
  var tbody = document.getElementById("tbod");

  // creating rows
  sortedPointLeaderboard.forEach((value, key) => {
      var row = document.createElement("tr");
      row.className = "row100 body";

      // create cells in row
          var nameCell = document.createElement("td");
          var pointCell = document.createElement("td");
          var timeCell = document.createElement("td");

          var nameText = document.createTextNode(key);
          var pointText = document.createTextNode(value);
          var timeText = document.createTextNode(averageTimeLeaderboard.get(key));

          nameCell.appendChild(nameText);
          pointCell.appendChild(pointText);
          timeCell.appendChild(timeText);

          if (key == currentLinealChampion) {
            nameCell.style.color = "gold";
          }

          nameCell.className = "cell100 column1";
          pointCell.className = "cell100 column3";
          timeCell.className = "cell100 column5";

          row.appendChild(nameCell);
          row.appendChild(pointCell);
          row.appendChild(timeCell);

      tbody.appendChild(row); // add the row to the end of the table body
  })
}


$.getJSON("js/snap-league-results-pre-alpha.json", function(json){
  races = json;

  let [pointLeaderboard, averageTimeLeaderboard, averagePointsLeaderboard, currentLinealChampion] = createLeaderboard(races);
  // console.log(pointLeaderboard);
  // console.log(averageTimeLeaderboard);
  // console.log(averagePointsLeaderboard);
  // console.log(`Current Lineal Champion: ${currentLinealChampion}`);
  drawTable(pointLeaderboard, averageTimeLeaderboard, currentLinealChampion);
});