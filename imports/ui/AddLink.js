// rfcp, rcc

// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';

import Modal from 'react-modal'

export default class AddLink extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '',
            isOpen: false,
        }
    }
    onSubmit(e) {
        // const url = this.refs.url.value.trim()
        const { url } = this.state

        e.preventDefault()

        if (url) {
            // mengisi data via methods
            Meteor.call('links.insert', url, (err, res) => {
                if(!err) {
                    this.handleModalClose()
                } else {
                    this.setState({
                        error: err.reason,
                    })
                }
            })

            // mengisi data langsung ke mongo
            // Links.insert({
            //   url,
            //   userId: Meteor.userId(),
            // })
            this.refs.url.value = ''
        }
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }
    handleModalClose() {
        this.setState({
            isOpen: false,
            url: '',
            error: '',
        })
    }
    render() {
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        isOpen: true
                    })
                }}>+ Add Link</button>

                <Modal isOpen={this.state.isOpen} contentLable="Add Link" onAfterOpen={() => this.refs.url.focus()} onRequestClose={this.handleModalClose.bind(this)}>
                    <p>Add Link</p>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}></input>
                        <button>Add Link</button>
                    </form>

                    <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
                </Modal>
            </div>
        )
    }
}

AddLink.propTypes = {

}

