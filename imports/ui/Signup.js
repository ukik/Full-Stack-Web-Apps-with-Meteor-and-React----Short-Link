import React, { Component } from 'react'
import { Link } from 'react-router'

// 'meteor/accounts-base'
const { Accounts } = require('meteor/accounts-base')

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }
  }
  onSubmit(e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (password.length < 9) {
      return this.setState({
        error: 'Password mus be more than 8 characters long'
      })
    }

    Accounts.createUser({email, password}, (err) => {
      console.log('Sigunp', err);
      console.log(Accounts)

      if (err) {
        this.setState({
          error: err.reason
        })
      } else {
        this.setState({
          error: ''
        })
      }

    })

  }
  render() {
    return (
      <div>
          <h1>Join Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          {/* noValidate mengabaikan requirement type yang ada di form */}
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="email"></input>
            <input type="password" ref="password" name="password" placeholder="password"></input>
            <button>Create Account</button>
          </form>

          <Link to='/'> Already have an account?</Link>
      </div>
    )
  }
}

