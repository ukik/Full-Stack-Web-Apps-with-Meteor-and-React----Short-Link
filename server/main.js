import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import { Links } from '../imports/api/links'

import moment from 'moment'

import '../imports/api/users'
import '../imports/api/links'
import '../imports/startup/simple-schema-configuration'

Meteor.startup(() => {
  let now = new Date().getTime()
  console.log(now);
  
  // Jan 16th, 2017
  // 1:02pm
  let momentNow = moment(0)
  console.log(momentNow.fromNow());

  // REDIRECTING
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    console.log("_id:"+_id, "link:"+link);

    if (link) {
      // Creating and registering new middleware function
      // Set HTTP status code to a 302
      // Set 'Location' header to 'http://www.google.com'
      // End the request
      // console.log(req.url) // test localhost:3000/1234567890
      res.statusCode = 302
      // res.setHeader('Location', 'http://www.google.com')
      res.setHeader('Location', link.url)
      res.end()

      Meteor.call('links.trackVisit', _id)

    } else {
      next()
    }

  })

  /*
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware!')
    console.log(req.url, req.method, req.headers, req.query);

    // Set HTTP status code
    res.statusCode = 404

    // Set HTTP headers
    res.setHeader('my-custom-header', 'Ukik was here!')

    // Set HTTP body
    // res.write('<h1>This is my middleware at work!</h1>')

    // End HTTP request
    // res.end()

    next()
  })
  */
})

/*
Meteor.startup(() => {
  // code to run on server at startup

  // example
  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true,
  //   },
  //   age: {
  //     type: Number,
  //     min: 0,
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone,
  //   }
  // });

  // petSchema.validate({
  //   age: 21,
  //   contactNumber: 'abc2245'
  // })

  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0,
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // })

  // employeeSchema.validate({
  //   name: 'Ukik',
  //   hourlyWage: 35,
  //   email: 'ukik@gmail.com',
  // })

  // cara memanggil Meteor.methods({}) di imports/api/links.js
  Meteor.call('greetUser', 'NOVA', (err, res) => {
    console.log('Greet User Arguments', err, res);
  })

  // Call links.insert 'abcdef
  // Meteor.call('links.insert', 'abcdef')

});
*/