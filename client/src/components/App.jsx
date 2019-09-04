import React from 'react'
import styled from 'styled-components'
import OuterComponent from './outerComponent.jsx'
import ReportListing from './ReportListing.jsx'
import $ from 'jquery'


class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
//pulled from server
      cost: null,
      rating: null,
      ratingAmount: null,
      guestsAllowed: null,
      guestsInfants: null,
      cleaningFee: null,
      serviceFee: null,
      occupancyFee: null,
      daysMinimum: null,
      reservations: null,
//choices made in app
      adultsChosen: 1,
      childrenChosen: 0,
      infantsChosen: 0,
      startDate: null,
      endDate: null,
    }
    this.onAddGuest = this.onAddGuest.bind(this);
    this.onSubGuest = this.onSubGuest.bind(this);
  }

  componentDidMount() {
    this.getListingdata()
    this.getReservations()
  }

  getListingdata () {
    $.ajax({
      url: 'http://localhost:3002/api/listingData/69',
      success: (result) => {
        this.setState({
          cost: result.perNight,
          rating: result.Rating,
          ratingAmount: result.RatingAmount,
          guestsAllowed: result.guestsAllowed,
          guestsInfants: result.guestsInfants,
          cleaningFee: result.cleaningFee,
          serviceFee: result.serviceFee,
          occupancyFee: result.occupancyFee,
          daysMinimum: result.daysMinimum,
        })
      },
    });
  }

  getReservations () {
    $.ajax({
      url: 'http://localhost:3002/api/reservations/1',
      success: (result) => {
        this.setState({
          reservations: result,
        })
      },
    });
  }

  onAddGuest(string) {
    if (string === "childrenChosen" || string == "adultsChosen") {
      if (this.state.adultsChosen + this.state.childrenChosen === this.state.guestsAllowed) {
      return;
      }
    } else if (string === "infantsChosen") {
      if (this.state.guestsInfants === this.state.infantsChosen) {
        return;
      }
    }
    var num = this.state[string]
    num++
    var object = {};
    object[string] = num;
    this.setState(object)
  }

  onSubGuest(string) {
    if (string === "adultsChosen") {
      if (this.state.adultsChosen === 1) {
        return;
      }
    } else if (string === "childrenChosen" || string === "infantsChosen") {
      if (this.state[string] === 0) {
        return;
      }
    }
    var num = this.state[string]
    num--
    var object = {};
    object[string] = num;
    this.setState(object)
  }

  onSelectDate(startEnd, day, month, year) {
    var Obj = {}
    Obj[startEnd] = {};
    Obj[startEnd].day = day;
    Obj[startEnd].month = month;
    Obj[startEnd].year = year;
    this.setState(Obj)
  }

  onClearDates() {
    this.setState({
      startDate: null,
      endDate: null,
    })
  }

  closeModal() {
    window.onclick = function() {
      this.setState({
        start: false,
        end: false,
      })
    }
  }
  render () {
    return (
      <div>
        <OuterComponent state = {this.state} onAdd = {this.onAddGuest.bind(this)} onSub = {this.onSubGuest.bind(this)}
          onSelect = {this.onSelectDate.bind(this)} onClear = {this.onClearDates.bind(this)}
        />
        <ReportListing/>
      </div>
    )
  }
}

export default App