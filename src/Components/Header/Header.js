import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';
import LoggedInUser from './LoggedInUser';



const Header = props => {

    const logout = () => {
        axios
            .delete('/auth/logout')
            .then(res => {
                props.updateUserInfo({
                    username: '',
                    user_id: '',
                })
            })
        console.log("logged out")
    }



    return (
        <header className="app-header">
            <Link to="/" className="link">
                <div className="logo">
                    <img src="assets/Dota-2-Logo.png" alt="dota logo"/>
                    <h1 className="title">Dota 100</h1>
                </div>
            </Link>
            <div className="middle-items">
                <Link className="link" to="/">
                    <li>Dashboard</li>
                </Link>
                <Link className="link" to="/leaderboard">
                    <li>Leaderboard</li>
                </Link>
            </div>
                <LoggedInUser 
                    logout={logout}
                />
        </header>
    )
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(Header)