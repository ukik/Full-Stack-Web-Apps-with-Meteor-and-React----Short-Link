import React, { Component } from 'react';
import AddLink from './AddLink';
// import {browserHistory} from 'react-router'
// import { Accounts } from 'meteor/accounts-base'
// import { Meteor } from 'meteor/meteor';
// import { Links } from '../api/links'
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';

import { PrivateHeader } from './PrivateHeader';

// OPSI 2
// Stateless component
export default () => {
  return (
    <div>
      <PrivateHeader />
      <LinksListFilters />
      <LinksList />
      {/* <p>Add Link</p> */}
      <AddLink />
    </div>
  )
}

// OPSI 1
// export default class Link extends Component {
//   // onLogout(e) {
//   //   // browserHistory.push('/')
//   //   Accounts.logout()
//   // }
//   // onSubmit(e) {
//   //   const url = this.refs.url.value.trim()

//   //   e.preventDefault()

//   //   if(url) {
//   //     // mengisi data via methods
//   //     Meteor.call('links.insert', url)

//   //     // mengisi data langsung ke mongo
//   //     // Links.insert({
//   //     //   url,
//   //     //   userId: Meteor.userId(),
//   //     // })
//   //     this.refs.url.value = ''
//   //   }
//   // }
//   render() {
//     return (
//       <div>
//         {/* <h1>Your Link</h1>
//         <button onClick={this.onLogout.bind(this)}>Lougout</button> */}
//         <PrivateHeader title='Your Links'/>
//         <LinksList />
//         <p>Add Link</p>
//         <AddLink />
//         {/* <form onSubmit={this.onSubmit.bind(this)} noValidate>
//           <input type="text" ref="url" placeholder="URL"></input>
//           <button>Add Link</button>
//         </form> */}
//       </div>
//     )
//   }
// }

