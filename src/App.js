import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ManageShows from './Pages/ManageShows'
import ViewShows from './Pages/ViewShows'
import './App.css'

class App extends Component {
  state = {
    shows: []
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

  startPromise = (success) => {
    return new Promise((resolve, reject) => {
      const successMessage = 'promise was successful'
      const errorMessage = 'promise failed epically'
      setTimeout(() => {
        if (success)
          resolve(successMessage)
        else
          reject(errorMessage)
      }, 5000)
    })
  }

  testPromises = () => {
    console.log('testing some promises')
    this.startPromise(true).then((value) => { console.log(value) }).catch((error) => { console.log(error) })
    console.log('finshed executing promise')
  }

  getShows = async () => {
    try {
      const showsResponse = await fetch('http://localhost:3001/shows')
      const shows = await showsResponse.json()
      this.setState({ shows })
    } catch (error) {
      this.setState({ errorMessage: error })
    }
  }

  postShow = (showToSave) => {
    console.log(showToSave)
    const postInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showToSave)
    }
    fetch('http://localhost:3001/shows', postInit)
      .then((postShowsReponse) => {
        return postShowsReponse.json()
      })
      .then((show) => {
        console.log("postedShow:", show)
        this.createShow(show)
      })
      .catch((error) => {
        console.log("failed to parse json from post:", error)
        this.setState({ errorMessage: error })
      })
  }

  renderError = () => {
    console.log("errormessage is:", this.state.errorMessage)
    return this.state.errorMessage
      ? (<div>{this.state.errorMessage.toString()}</div>)
      : (<div></div>)
  }

  componentDidMount() {
    //this.testPromises()
    this.getShows()
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.renderError()}
          <Switch>
            <Route exact path="/" component={() => <ViewShows allShows={this.state.shows} />} />
            <Route path="/manageShows" component={() => <ManageShows allShows={this.state.shows} createShow={this.postShow} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
