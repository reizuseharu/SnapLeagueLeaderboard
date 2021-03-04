// @ts-nocheck
/* eslint-disable */
import {AppBar, Tab, Tabs} from "@material-ui/core"
import React from "react"
// creates a beautiful scrollbar
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import image from '@assets/img/sidebar-2.jpg'
import LeaderboardBody from "@views/LeaderboardBody"
import {RouteComponentProps} from "react-router"

interface Props {
  classes: any
  location: any
  history: any
  match: any

}

interface State {
  value: number
  image: string
  color: string
  hasImage: boolean
  fixedClasses: string
  mobileOpen: boolean
  shouldShowLeaderboardPreAlpha: boolean
  shouldShowLeaderboardAlpha: boolean
  shouldShowLeaderboard1: boolean
  shouldShowLeaderboard2: boolean
  shouldShowLeaderboard3: boolean
  shouldShowLeaderboard4: boolean
}

class Leaderboard extends React.Component<Props & RouteComponentProps, State> {
  refs: any
  constructor(props: Props) {
    super(props)
    this.state = {
      image,
      value: 0,
      color: 'blue',
      hasImage: true,
      fixedClasses: 'dropdown show',
      mobileOpen: false,
      shouldShowLeaderboardPreAlpha: false,
      shouldShowLeaderboardAlpha: true,
      shouldShowLeaderboard1: false,
      shouldShowLeaderboard2: false,
      shouldShowLeaderboard3: false,
      shouldShowLeaderboard4: false
    }

    this.showComponent = this.showComponent.bind(this)
  }

  showComponent(index: number) {
    switch (index) {
      case 0:
        this.setState({ shouldShowLeaderboardPreAlpha: true })
        this.setState({ shouldShowLeaderboardAlpha: false })
        this.setState({ shouldShowLeaderboard1: false })
        this.setState({ shouldShowLeaderboard2: false })
        this.setState({ shouldShowLeaderboard3: false })
        this.setState({ shouldShowLeaderboard4: false })
        break
      case 1:
        this.setState({ shouldShowLeaderboardPreAlpha: false })
        this.setState({ shouldShowLeaderboardAlpha: true })
        this.setState({ shouldShowLeaderboard1: false })
        this.setState({ shouldShowLeaderboard2: false })
        this.setState({ shouldShowLeaderboard3: false })
        this.setState({ shouldShowLeaderboard4: false })
        break
      case 2:
        this.setState({ shouldShowLeaderboardPreAlpha: false })
        this.setState({ shouldShowLeaderboardAlpha: false })
        this.setState({ shouldShowLeaderboard1: true })
        this.setState({ shouldShowLeaderboard2: false })
        this.setState({ shouldShowLeaderboard3: false })
        this.setState({ shouldShowLeaderboard4: false })
        break
      case 3:
        this.setState({ shouldShowLeaderboardPreAlpha: false })
        this.setState({ shouldShowLeaderboardAlpha: false })
        this.setState({ shouldShowLeaderboard1: false })
        this.setState({ shouldShowLeaderboard2: true })
        this.setState({ shouldShowLeaderboard3: false })
        this.setState({ shouldShowLeaderboard4: false })
        break
      case 4:
        this.setState({ shouldShowLeaderboardPreAlpha: false })
        this.setState({ shouldShowLeaderboardAlpha: false })
        this.setState({ shouldShowLeaderboard1: false })
        this.setState({ shouldShowLeaderboard2: false })
        this.setState({ shouldShowLeaderboard3: true })
        this.setState({ shouldShowLeaderboard4: false })
        break
      case 5:
        this.setState({ shouldShowLeaderboardPreAlpha: false })
        this.setState({ shouldShowLeaderboardAlpha: false })
        this.setState({ shouldShowLeaderboard1: false })
        this.setState({ shouldShowLeaderboard2: false })
        this.setState({ shouldShowLeaderboard3: false })
        this.setState({ shouldShowLeaderboard4: true })
        break
      default:
        break
    }
  }

  getRoute() {
    return this.props.location.pathname !== '/darts'
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel)
    }
    window.addEventListener('resize', this.resizeFunction)
  }

  componentDidUpdate(e: any) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction)
  }

  handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value: value })
    this.showComponent(value)
  }

  render() {
    const { classes, ...rest } = this.props
    const { shouldShowLeaderboardPreAlpha, shouldShowLeaderboardAlpha, shouldShowLeaderboard1, shouldShowLeaderboard2, shouldShowLeaderboard3, shouldShowLeaderboard4 } = this.state

    return (
      <div id={"container"}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
            <Tab label="Pre-Alpha" />
            <Tab label="Alpha" />
            <Tab label="Primera" />
            <Tab label="Segundo" />
            <Tab label="Tercera" />
            <Tab label="Cuarto" />
          </Tabs>
        </AppBar>
        { shouldShowLeaderboardPreAlpha && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"pre-alpha"}/> }
        { shouldShowLeaderboardAlpha && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"alpha"}/> }
        { shouldShowLeaderboard1 && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"1"}/> }
        { shouldShowLeaderboard2 && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"2"}/> }
        { shouldShowLeaderboard3 && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"3"}/> }
        { shouldShowLeaderboard4 && <LeaderboardBody location={this.props.location} history={this.props.history} match={this.props.match} league={"4"}/> }
      </div>
    )
  }
}

export default Leaderboard
