import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'
import { Accounts } from 'meteor/accounts-base';

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address

    // try { // menggunakan global Error di imports/startup/simple-schema-configuration.js
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email,
        }
      }).validate({
        email: email
      })
    // } catch (error) {
    //   throw new Meteor.Error(400, error.message)
    // }  

    return true
  })