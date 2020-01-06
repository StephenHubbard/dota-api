import React, {Component} from 'react';
import './Auth.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {updateUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Auth extends Component {
    state={
        username: '',
        email: '',
        password: '',
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    register = () => {
        const {username, password} = this.state
        axios
            .post('/auth/register', {username, password})
            .then(res => {
                this.props.updateUserInfo(res.data.user)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    login = () => {
        const {username, password} = this.state
        axios 
            .post('/auth/login', {username, password})
            .then(res => {
                this.props.updateUserInfo(res.data.user)
                console.log(res.data.message)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }
    
    render() {
        return (
            <div className="auth-page">
                <div className="Auth">
                    <div className="auth-container">
                        <h1>Welcome!  If you'd like to try browsing as an online user with an accompanying Dota account.  Please feel free to use Username: 'a' Password: 'a'. </h1>
                        <div className="two-input">
                            <input 
                                placeholder="Username" 
                                type="text"
                                onChange={e => this.handleChange('username', e.target.value)}
                                value={this.state.username}
                            />
                            <input 
                                placeholder="Password" 
                                type="password"
                                onChange={e => this.handleChange('password', e.target.value)}
                                value={this.state.password}
                            />                    
                        </div>
                        <Link to="/profile">
                            <button onClick={this.login}>Login</button>
                        </Link>
                        <Link to="/profile">
                            <button onClick={this.register}>Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}
const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)