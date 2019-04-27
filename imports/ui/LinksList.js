import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';

import LinksListItem from '../ui/LinksListItem'

import { Session } from 'meteor/session'

export default class LinksList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            links: []
        }
    }
    componentDidMount() {
        console.log('componentDidMount LinksList');

        // let linksTracker = Tracker.autorun(() => {
        this.linksTracker = Tracker.autorun(() => {

            // links adalah nama dari publish di imports/api/links.js
            Meteor.subscribe('links')

            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch()
            console.log('New Links', links);

            // dengan menambahkan Meteor.subscribe('links') di atas, akan membuat data yang dimasukkan ke const links adalah hasil dari imports/api/links.js
             
            // Meteor.publish('links', () => {
            //     return Links.find({
            //         url: "2"
            //     })
            // })                

            this.setState({ links })
        })
    }
    componentWillUnmount() {
        console.log('componentWillMount LinksList');
        this.linksTracker.stop() // stop binding atau to avoid rerun meskipun terjadi perubahan mongo di dalam Tracker 
    }
    renderLinksListItems() {
        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id)
            console.log('link', link);
            console.log('shortUrl', shortUrl);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            // return <p key={link._id}>{link.url}</p> // ._id didapat dari mongo (_id auto generate)
        }) 
    }
    render() {
        return (
            <div>
                <p>Link List</p>
                <div>
                    {this.renderLinksListItems()}
                </div>
            </div>
        )
    }
}

LinksList.propTypes = {

}
