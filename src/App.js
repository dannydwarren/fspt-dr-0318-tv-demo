import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ManageShows from './Pages/ManageShows'
import ViewShows from './Pages/ViewShows'
import './App.css'

class App extends Component {
  state = {
    shows: [
      {
        name: 'Trollhunters',
        rating: 3,
        previewImage: 'http://cdn03.cdn.justjaredjr.com/wp-content/uploads/headlines/2016/10/trollhunters-poster.jpg'
      }
    ]
  }

  createShow = (show) => {
    this.setState((prev) => {
      const existingShows = prev.shows
      existingShows.push(show)

      return {
        shows: existingShows
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => <ViewShows allShows={this.state.shows} />} />
            <Route path="/manageShows" component={() => <ManageShows allShows={this.state.shows} createShow={this.createShow} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
