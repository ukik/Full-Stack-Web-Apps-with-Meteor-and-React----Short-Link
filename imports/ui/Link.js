import React, { Component } from 'react'
// import {browserHistory} from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class Link extends Component {
  onLogout(e){
    // browserHistory.push('/')
    Accounts.logout()
  }
  render() {
    return (
      <div>
        <h1>Your Link</h1>
        <button onClick={this.onLogout.bind(this)}>Lougout</button>
      </div>
    )
  }
}

