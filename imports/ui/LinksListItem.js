import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import { Meteor } from 'meteor/meteor';

import moment from 'moment'

// Create boolean state called justCopied. Default to false
// On success switch justCopied to true
// Wait a second. Switch justCopied to false
// Dynamically render the button text. true => Copied, false => copy


export default class LinksListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            justCopied: false,
        }
    }
    componentDidMount() {
        console.log('LinkListItem.js props', this.props)

        const clipboard = new Clipboard(this.refs.copy)   
        
        clipboard.on('success', () => {
            this.setState({ justCopied: true })
            setTimeout(() => {
                this.setState({
                    justCopied:false,
                })
            }, 1000);
            // alert('It worked!')
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link.')
        }) 
    }
    componentWillUnmount() {
        // why? terjadi TypeError: Cannot read property 'destroy' of undefined
        // this.clipboard.destroy() 
    }
    myVisible() {
        if(this.props.visible == undefined) {
            return <p>visible: undefined</p>
        } 
        return <p>visible: {this.props.visible.toString()}</p>
    }
    myAnalytic(){
        if(this.props.visitedCount == undefined) {
            return <p>visitedCount: undefined & lastVisitedAt: undefined</p>
        } 
        return <p>{this.props.visitedCount} {this.renderStats()} - {this.props.lastVisitedAt}</p>
    }
    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
        let visitedMessage = null

        if(this.props.lastVisitedAt !== undefined) {
            if(typeof this.props.lastVisitedAt === 'number') {
                visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
            }
        }
        return visitMessage+' '+visitedMessage 
    }
    render() {
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.shortUrl}</p>
                {this.myVisible()}
                {this.myAnalytic()}
                <a href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button ref='copy' data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
                    {this.props.visible ? 'Hide' : 'Unhide'}
                </button>
            </div>
        )
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number,
}

LinksListItem.defaultProps = {
    visitedCount: 0,
}