import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor';

// global Error
SimpleSchema.defineValidationErrorTransform((error) => {
    return new Meteor.Error(400, error.message)
})