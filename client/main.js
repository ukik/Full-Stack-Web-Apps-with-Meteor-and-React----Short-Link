import './main.html';

import { Meteor } from 'meteor/meteor';

import ReactDOM from 'react-dom'
import { Tracker } from 'meteor/tracker'

import { routes, onAuthChange } from './../imports/routes/routes'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  // code to run on server at startup
  ReactDOM.render(routes, document.getElementById('app'))
});
