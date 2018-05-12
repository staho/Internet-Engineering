import React, { Component } from 'react'
import './App.css'
import Router from 'react-router'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Logged from './modules/menuBar/Logged'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Login from './modules/menuBar/Login'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'
import Apps from 'material-ui/svg-icons/navigation/apps'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Star from 'material-ui/svg-icons/action/stars'
import config from './config'
import Duels from './modules/duels/Duels';

class App extends Component {
  constructor(props){ 
    super(props)
    injectTapEventPlugin()
    this.state = {
      logged: false,
      selectedIndex: 0,
      user: {}
    }

  }

  componentWillMount = () => {
    if(localStorage.getItem("token")) {
      this.isTokenValid()
    }
  }

  changeLoggedState = (logged, username) => {
    this.setState({logged: logged, user: {username: username}})
    if(!logged) {
      localStorage.removeItem("token")
    }
    this.isTokenValid()
  }

  isTokenValid = token => {
    fetch(config.getRoute("profile"), {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },

    }).then(response => {
      if (response.status === 401) {
        this.setState({user: {}, logged: false})
        localStorage.removeItem("token")
        throw new Error(response.statusText)
      } else if(!response.ok) {
        throw new Error(response.statusText)
      }
      return response
    }).then(response => {
        return response.json()
    }).then(profile => {
      this.setState({user: profile, logged: true})
      // console.log(profile)
    }).catch(err => {
      console.error(err)
    })
  }

  select = index => this.setState({selectedIndex: index})

  render() {
    const recentsIcon = <Apps />
    const favoritesIcon = <Star />
    const nearbyIcon = <IconLocationOn />
    let mainElem = <Duels user={this.state.user}/>
    
    return (



      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <AppBar title="PingPong Tournaments"
                  iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                  iconElementRight={this.state.logged ? <Logged user={this.state.user} onChange={this.changeLoggedState} /> : <Login onChange={this.changeLoggedState} />}
                  
           />
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div className="content">
            {mainElem}
          </div>
          </MuiThemeProvider>
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Duels"
                icon={recentsIcon}
                onClick={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onClick={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onClick={() => this.select(2)}
              />
            </BottomNavigation>
          </Paper>
          </MuiThemeProvider>
        
      </div>
    );
  }
}

export default App;
