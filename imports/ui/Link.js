import React, { Component } from 'react'
// import {browserHistory} from 'react-router'
import { Accounts } from 'meteor/accounts-base'
import { Links } from '../api/links'
import LinksList from '../ui/LinksList'
import { Meteor } from 'meteor/meteor';

export default class Link extends Component {
  onLogout(e) {
    // browserHistory.push('/')
    Accounts.logout()
  }
  onSubmit(e) {
    const url = this.refs.url.value.trim()

    e.preventDefault()

    if(url) {
      // mengisi data via methods
      Meteor.call('links.insert', url)

      // mengisi data langsung ke mongo
      // Links.insert({
      //   url,
      //   userId: Meteor.userId(),
      // })
      this.refs.url.value = ''
    }
  }
  render() {
    return (
      <div>
        <h1>Your Link</h1>
        <LinksList />
        <button onClick={this.onLogout.bind(this)}>Lougout</button>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="text" ref="url" placeholder="URL"></input>
            <button>Add Link</button>
          </form>
      </div>
    )
  }
}

