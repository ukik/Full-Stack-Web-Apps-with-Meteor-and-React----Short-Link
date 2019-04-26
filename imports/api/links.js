import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';
import Links from '../ui/Links';
import Shortid from 'shortid'

export const Links = new Mongo.Collection('links')

// console.log(Meteor);
if (Meteor.isServer) {
    // links adalah nama yang di publish untuk ditangkap oleh subscribe
    Meteor.publish('links', function() { // this.userId bernilai sama dengan Meteor.userId
    // Meteor.publish('links', () => { // jika menggunakan arrow function () =>, maka this.userId undefined

        // Meteor.userId()
        // return Links.find({
        //     url: "2"
        // })

        console.log('api/links', this.userId);
        
        // hanya menampilkan data yang memiliki userId: Meteor.userId()
        // kata lain adalah milik user yang sedang login saja
        return Links.find({
            userId: this.userId
        })
    })    
}

// cara membuat methods untuk dipanggil dengan Meteor.call()
Meteor.methods({
    greetUser(name) {
        console.log('greetUser is running');
        
        if (!name) {
            throw new Meteor.Error('invalid-arguments', 'Name is required')
        }

        return `Helo ${name}!`
    },
    addNumbers(a, b) {
        if(typeof a !== 'number' || typeof b !== 'number') {
            throw new Meteor.Error('invalid-arguments', 'Expecting two numbers')
        }

        return a + b;
    }
    
})


Meteor.methods({
    'links.insert'(url) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized')
        }
        
        // try { // menggunakan global Error di imports/startup/simple-schema-configuration.js
            new SimpleSchema({
                url: {
                    type: String,
                    label: 'Your Link',
                    regEx: SimpleSchema.RegEx.Url,
                }
            }).validate({
                url
            })            
        // } catch (error) {
        //     throw new Meteor.Error(400, error.message)
        // }

        Links.insert({
            _id: Shortid.generate(),
            url,
            userId: this.userId
        })    
    }
})