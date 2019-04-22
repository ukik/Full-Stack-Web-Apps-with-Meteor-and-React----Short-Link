import React, { Component } from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'

export default class Login extends Component {
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

    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('Login callback', err);

      if (err) {
        this.setState({
          error: 'Unable to login. Check email and password'
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
            <h1>Login to Short Link</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            {/* noValidate mengabaikan requirement type yang ada di form */}
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="email"></input>
              <input type="password" ref="password" name="password" placeholder="password"></input>
              <button>Login</button>
            </form>

            <Link to='/signup'> Have an account?</Link>
      </div>
    )
  }
}
