import { Meteor } from 'meteor/meteor';

import '../imports/api/users'

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


});
