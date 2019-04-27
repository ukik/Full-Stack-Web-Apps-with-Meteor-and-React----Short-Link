import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { onAuthChange, routes } from './../imports/routes/routes';
import { Links } from '../imports/api/links'
import './../imports/startup/simple-schema-configuration';
import './main.html';

import { Session } from 'meteor/session'


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

// Session 
Session.set('name', 'Andrew Mead')
const name = Session.get('name')
console.log('name: ', name);

Tracker.autorun(() => {
  const name = Session.get('name')
  console.log('autorun name: ', name);  
})


// Tracker.autorun(() => {
//   const links = Links.find().fetch()
//   console.log('New Links', links);  
// })

// Stateless functional components
const MyComponent = (props) => {
  return(
    <div>
      <h1>MyComponent is here! {props.name}</h1>
    </div>
  )
}

Meteor.startup(() => {
  // set Session
  Session.set('showVisible', true)

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
  // ReactDOM.render(<MyComponent name={"UKIK"} />, document.getElementById('app'))
  ReactDOM.render(routes, document.getElementById('app'))
});
