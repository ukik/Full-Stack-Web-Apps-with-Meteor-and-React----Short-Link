import './main.html';

import { Meteor } from 'meteor/meteor';

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Tracker } from 'meteor/tracker'

import Signup from '../imports/ui/Signup'
import Link from '../imports/ui/Link'
import NotFound from '../imports/ui/NotFound'
import Login from '../imports/ui/Login'

const unauthenticatedPages = ['/','/signup']
const authenticatedPages = ['/links']
const onEnterPublicPage = () => {
// const onEnterPublicPage = (nextState, replace, callback) => {
  if(Meteor.userId()) {
    console.log('onEnterPublicPage', Meteor.userId());
    browserHistory.replace('/links') // opsi 1
    // replace('/links') // opsi 2
  }
  // callback();
}
const onEnterPrivatePage = () => { // tidak dipasang karena menyebabkan infinity-loop, lebih baik di abaikan sampai master di React
// const onEnterPrivatePage = (nextState, replace, callback) => {
  if(Meteor.userId()) {
    console.log('onEnterPrivatePage', Meteor.userId());
    // replace('/') // fatal: replace disini menyebabkan "Uncaught RangeError: Maximum call stack size exceeded"
    // browserHistory.replace('/') // fatal: replace disini menyebabkan "Uncaught RangeError: Maximum call stack size exceeded"
  }
  // callback();
}

function callback(params) {
  console.log('just a callback');
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
    {/* <Route path='/' component={Login}/> */}

    <Route path='/signup' component={Signup} onEnter={onEnterPublicPage}/>
    {/* <Route path='/signup' component={Signup}/> */}

    {/* <Route path='/links' component={Link} onEnter={onEnterPrivatePage({},{},callback)}/> */}
    {/* <Route path='/links' onEnter={onEnterPrivatePage}/> */}
    <Route path='/links' component={Link}/>
    <Route path='*' component={NotFound} />
  </Router>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const pathname = browserHistory.getCurrentLocation().pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  console.log('isAuthenticated', isAuthenticated);
  console.log('pathname', pathname);
  console.log('isUnauthenticatedPage', isUnauthenticatedPage);
  console.log('isAuthenticatedPage', isAuthenticatedPage);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links') 
    // browserHistory.push('/links') // kekurangan: menyebabkan back button pada browser tidak bekerja saat login
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/') 
    // browserHistory.push('/') // kekurangan: menyebabkan back button pada browser tidak bekerja saat login
  }
})

Meteor.startup(() => {
  // code to run on server at startup
  ReactDOM.render(routes, document.getElementById('app'))
});
