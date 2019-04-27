import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// OPSI 1
// export default class PrivateHeader extends Component {
//     onLogout() {
//         Accounts.logout();
//     }
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <button onClick={this.onLogout.bind(this)}>Logout</button>
//             </div>
//         )
//     }
// }



const PopUp = (e, props) => {
    alert(props.title)
}

// OPSI 2
// Stateless component
// React >= 16 cocok menggunakan Stateless Component karena memiliki fitur Hook
export const PrivateHeader = (props) => {

    // State of Stateless component
    // ReactHook tidak support versi React < 15 
    // for React >= 16
    // const [value, setValue] = useState(0)
    // const handleAddValue = () => {
    //     const newValue = value + 1
    //     setValue(newValue)
    //     alert(value)
    // }

    const onLogout = () => {
        Accounts.logout();
    }    
    return (
        <div>
            <h1 onClick={(e) => { 
                    PopUp(props)
                }}>
                {props.title} 
            </h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}


// letakkan secara waterfall Stateless
PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

PrivateHeader.defaultProps = {
    title: 'title is inside PrivateHeader'
}

