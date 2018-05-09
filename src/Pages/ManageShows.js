import React, { Component } from 'react'
import ReactPropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Show from '../Show'
import './ManageShows.css'

export default class ManageShows extends Component {
    static propTypes = {
        createShow: ReactPropTypes.func.isRequired
    }

    state = {
        show: {
            name: '',
            rating: -1,
            previewImage: ''
        }
    }

    handleOnChange = (event) => {
        if (event.target.id === "nameInput") {
            this.setState({
                newShowName: event.target.value
            })
        } else if (event.target.id === "ratingInput") {
            this.setState({
                newShowRating: Number(event.target.value)
            })
        } else if (event.target.id === "previewImageInput") {
            this.setState({
                newShowPreviewImage: event.target.value
            })
        }
    }

    handleOnClick = () => {
        this.props.createShow({
            name: this.state.newShowName,
            rating: this.state.newShowRating,
            previewImage: this.state.newShowPreviewImage
        })
    }

    renderShows = () => {
        return this.props.allShows.map((show, i) => {
            return (
                <Show key={i} name={show.name} rating={show.rating} previewImage={show.previewImage} />
            )
        })
    }

    getAvgRating = () => {
        if(this.props.allShows.length < 1){
            return 0
        }

        const sumOfRatings = this.props.allShows.reduce((accumulator, show) => {
            //console.log("getAvgRating(acc, show) -> return", accumulator, show.rating, show.rating + accumulator)
            return show.rating + accumulator
        }, 0)

        return sumOfRatings / this.props.allShows.length
    }

    hasEnoughKidShows = () => {
        const minRequiredKidShows = 2

        let kidShowCount = 0
        let remainingShows = this.props.allShows.length
        while (kidShowCount < minRequiredKidShows && remainingShows) {
            remainingShows--

            const show = this.props.allShows[remainingShows]

            if (show.rating === 1) {
                kidShowCount++
            }
        }

        return (kidShowCount >= minRequiredKidShows).toString()
    }

    render() {
        // console.log("STATE", this.state)
        return (
            <div className="manageShows">
                <section className="viewAllShows">
                    <header>
                        <h1>All Shows</h1>
                        <p>Avg Rating: {this.getAvgRating()}</p>
                        <p>Has Enough Kid Shows: {this.hasEnoughKidShows()}</p>
                    </header>
                    <div>
                        {this.renderShows()}
                    </div>
                    <Link to="/">View Shows</Link>
                </section>
                <section className="createShow">
                    <header><h1>New Show</h1></header>
                    <div>
                        <div><label>Name:</label><input id="nameInput" onChange={this.handleOnChange} /></div>
                        <div><label>Rating:</label><input id="ratingInput" onChange={this.handleOnChange} /></div>
                        <div><label>Preview Image:</label><input id="previewImageInput" onChange={this.handleOnChange} /></div>
                        <button onClick={this.handleOnClick}>Create</button>
                    </div>
                </section>
            </div>
        )
    }
}