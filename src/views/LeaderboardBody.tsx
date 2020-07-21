import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import dashboardStyle from '@assets/jss/material-dashboard-react/views/dashboardStyle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import {createLeaderboard, Race, sortLeaderboard} from "@services/leaderboardGenerator";

interface Props {
  location: any;
  history: any;
}

interface State {
  pointLeaderboard: Map<string, number>;
  averageTimeLeaderboard: Map<string, number>;
  averagePointsLeaderboard: Map<string, number>;
  sortedPointLeaderboard: Map<string, number>;
  currentLinealChampion: string;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pointLeaderboard: new Map(),
      averageTimeLeaderboard: new Map(),
      averagePointsLeaderboard: new Map(),
      sortedPointLeaderboard: new Map(),
      currentLinealChampion: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = () => {};

  async componentWillMount() {
    let raceFile: string = "https://gist.githubusercontent.com/reizuseharu/7b71bcb7cb253b0d0190225dc1699e35/raw/snap-league-results-pre-alpha.json";
    let raceResponse: Response = await fetch(raceFile);

    let races: Race[] = await raceResponse.json();

    // @ts-ignore
    let [pointLeaderboard, averageTimeLeaderboard, averagePointsLeaderboard, currentLinealChampion]: [Map<string, number>, Map<string, number>, Map<string, number>, string] = createLeaderboard(races);
    let sortedPointLeaderboard: Map<string, number> = sortLeaderboard(pointLeaderboard);

    console.log("Working");

    this.setState({
      pointLeaderboard: pointLeaderboard,
      averageTimeLeaderboard: averageTimeLeaderboard,
      averagePointsLeaderboard: averagePointsLeaderboard,
      sortedPointLeaderboard: sortedPointLeaderboard,
      currentLinealChampion: currentLinealChampion
    });

    console.dir(this.state);
    return Promise.resolve();
  }

  render() {
    return (
      <div style={{
        height:"100vh",
        backgroundColor: "#99CCFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
        <Table size="small" aria-label="a dense table" style={{
          marginLeft: "20%",
          marginRight: "20%",
          width: "60%"
        }}>
          <TableHead style={{backgroundColor: "#3390FF"}}>
            <TableCell align="center">Runner</TableCell>
            <TableCell align="center">Points</TableCell>
            <TableCell align="center">Average Time</TableCell>
          </TableHead>
          <TableBody>
            {Array.from(this.state.sortedPointLeaderboard).map(([runnerName, points], index) => {
              return <TableRow style={(() => { if (index % 2 === 1) {return {backgroundColor: "#BBBBBB"}} else {return {backgroundColor: "#B19CD9"}}})()}>
                <TableCell align="center" style={(() => { if (runnerName === this.state.currentLinealChampion) return {color: "gold"}})()}>{runnerName}</TableCell>
                <TableCell align="center">{points}</TableCell>
                <TableCell align="center">{this.state.averageTimeLeaderboard.get(runnerName)}</TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(dashboardStyle)(Dashboard);
