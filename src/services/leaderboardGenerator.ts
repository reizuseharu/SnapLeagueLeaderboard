export interface Runner {
    name: string;
    time: number;
    placement: number;
}

export interface Race {
    name: string;
    date: Date;
    runners: Runner[];
}

let pointConversion = new Map([
    [1, 10],
    [2, 7],
    [3, 5],
    [4, 4],
    [5, 3],
    [6, 2],
    [7, 1],
]);

function convertPlacementToPoints(placement: number): number {
    return pointConversion.get(placement) ?? 0
}

export function createLeaderboard(races: Race[]): [Map<string, number>, Map<string, number>, Map<string, number>, string][] {
    let pointLeaderboard: Map<string, number> = new Map();
    let averageTimeLeaderboard: Map<string, number> = new Map();
    let averagePointsLeaderboard: Map<string, number> = new Map();
    let raceTimes = new Map();
    let currentLinealChampion: string = "";

    races.forEach((race: Race) => {
        let raceRunners = new Set(race.runners.map((runner) => runner.name));
        let runnerPlacements = new Map();
        race.runners.forEach((runner) => {
            let runnerName = runner.name;
            let runnerPlacement = runner.placement;
            let runnerPoints = convertPlacementToPoints(runnerPlacement);

            let initialPoints: number = pointLeaderboard.get(runnerName) ?? 0;

            pointLeaderboard.set(runnerName, initialPoints + runnerPoints);

            let runnerTime = runner.time;
            let runnerTimes: number[] = raceTimes.get(runnerName) ?? [];

            runnerTimes.push(runnerTime);
            raceTimes.set(runnerName, runnerTimes);

            averageTimeLeaderboard.set(runnerName, runnerTimes.reduce((totalTime, time) => totalTime + time, 0) / runnerTimes.filter((time) => time > 0).length);
            averagePointsLeaderboard.set(runnerName, (pointLeaderboard.get(runnerName) ?? 0) / runnerTimes.length);
            runnerPlacements.set(runnerName, runnerPlacement);

            if (currentLinealChampion === "" && runnerPlacement === 1) {
                currentLinealChampion = runnerName;
            }
            if (raceRunners.has(currentLinealChampion) && runnerPlacement === 1) {
                currentLinealChampion = runnerName;
            }
        });
    });

    // @ts-ignore
    return [pointLeaderboard, averageTimeLeaderboard, averagePointsLeaderboard, currentLinealChampion];
}


export function sortLeaderboard(pointLeaderboard: Map<string, number>): Map<string, number> {
    // @ts-ignore
    return new Map([...pointLeaderboard.entries()].sort((a, b) => {
        return a[1] - b[1];
    }).reverse());
}
