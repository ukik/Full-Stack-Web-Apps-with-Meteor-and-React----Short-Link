import './main.html';

import { Meteor } from 'meteor/meteor';

import ReactDOM from 'react-dom'
import { Tracker } from 'meteor/tracker'

import { routes, onAuthChange } from './../imports/routes/routes'
// import { Links } from '../imports/api/links'

import './../imports/startup/simple-schema-configuration'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

// Tracker.autorun(() => {
//   const links = Links.find().fetch()
//   console.log('New Links', links);  
// })

Meteor.startup(() => {

  // cara memanggil Meteor.methods({}) di imports/api/links.js
  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Arguments', err, res);
    
  })

  // cara memanggil Meteor.methods({}) di imports/api/links.js
  Meteor.call('addNumbers', '100', 200, (err, res) => {
    console.log('addNumbers A Arguments', err, res);
    
  })  

  // cara memanggil Meteor.methods({}) di imports/api/links.js
  Meteor.call('addNumbers', 10, 200, (err, res) => {
    console.log('addNumbers B Arguments', err, res);
    
  })  


  // code to run on server at startup
  ReactDOM.render(routes, document.getElementById('app'))
});
