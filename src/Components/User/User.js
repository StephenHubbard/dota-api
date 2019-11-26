import React, {Component} from 'react';
import './User.css';
import LowerContainer from './LowerContainer';
import DoughnutGraph from './DoughnutGraph';
import RecentStats from './RecentStats';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import FollowedUsers from './FollowedUsers';




class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: '',
            wl: '',
            recentMatches: '',
            followedUsers: [],
            followedUsersFinal: '',
            followedUsersData: [],
        }
    }

    componentDidMount() {
        let newArr = []
        if (this.props.userObj) { 
            axios
            .get(`https://api.opendota.com/api/players/${this.props.userObj.account_id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
                // console.log(res.data)
            })
            
        } else {
            axios
            .get(`https://api.opendota.com/api/players/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    data: res.data
                })
                axios
            .get('/api/followed')
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        newArr.push(res.data[i].followee_id)
                        }
                    })
                    .then(res => {
                        this.setState({
                            followedUsers: newArr
                        }, () => {
                            console.log(this.state.followedUsers)
                        })

                    })
                
                console.log(this.state.followedUsers)
                this.getAccountIds()
            })   
            .catch(err => {
                console.log("need to login")
            })
        }
    }

    getAccountIds() {
        let newArr = []
        console.log(this.state.followedUsers)
        for (let i = 0; i < this.state.followedUsers.length; i++) {
            console.log("test" + this.state.followedUsers[0])
            let user_id = this.state.followedUsers[i]
            axios
            .post('/api/followed/users', {user_id})
            .then(res => {
                newArr.push(res.data[i].account_id)
                console.log(newArr)
            })
        }
            this.setState({
                followedUsersFinal: newArr
            }) 
            console.log(this.state.followedUsersFinal)
            
            this.renderFollowedUsers()
        }
    

    renderFollowedUsers() {
        console.log("render followed users fn hit")
        if (this.state.followedUsersFinal) {
        axios
            .get(`https://api.opendota.com/api/players/${this.state.followedUsersFinal}`)
            .then(res => {
                let newArr = []
                newArr.push(res.data)
                this.setState({
                    followedUsersData: newArr
                })
            })
            } 
        }

    deleteUser(id) {
        axios
            .delete(`api/users/${id}`)
            .then(res => {
                console.log("user deleted from db")
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
    }
    

    render(props) {    
        let key = 0;  

        return (
            <div className="user-cont">
                {/* only rendered on dashboard */}
                {this.props.userObj ? (
                    <Link className="link" to={`/user/${this.props.userObj.account_id}`}>
                        <div className="user">
                            {this.state.data ? (
                            <div className="user-info">
                                <div className="basic-info">
                                    <div className="name">
                                        <h1>{this.state.data.profile.personaname}</h1>
                                        {this.state.data.profile.plus ? (
                                            <div className="dota-plus-icon-div">
                                                <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                                <span className="dota-plus-icon-tooltip">Dota Plus User</span>
                                            </div>
                                        ) : null}
                                    </div>
                                    <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                    {/* <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2> */}
                                </div>
                                <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                            </div>
                            ) : null }
                        </div>
                    </Link>
                ) :
                // rendered on single user page
                <div className="single-user">
                    <div className="top-two-divs">
                        <div className="display-column">
                            {this.props.is_admin ? (
                                <button className="delete-user" onClick={() => this.deleteUser(this.state.data.profile.account_id)}>Delete User</button>
                            ) : null }
                            {this.props.username ? (
                                <button className="follow-user">Follow</button>
                            ) : null } 
                        </div>
                        <div className="user-solo">
                            {this.state.data ? (
                                <div className="user-info">
                                        <div className="basic-info">
                                            <div className="name">
                                                <h1>{this.state.data.profile.personaname}</h1>
                                                {this.state.data.profile.plus ? (
                                                    <div className="dota-plus-icon-div">
                                                        <img className="dota-plus-icon" src="assets/Dota_Plus_icon.png" alt="dota-plus-logo" />
                                                        <span className="dota-plus-icon-tooltip">Dota Plus User</span>
                                                    </div>                                                ) : null}
                                            </div>
                                            <h2>MMR: {this.state.data.mmr_estimate.estimate}</h2>
                                            {/* <h2>Win/Lose: {this.state.wl.win} - {this.state.wl.lose}</h2> */}
                                        </div>                            
                                        <img className="profile-img" src={this.state.data.profile.avatarfull} alt="profile pic" />
                                </div>

                            ) : null }
                        </div>

                    <div className="follow-cont">
                        {this.state.followedUsersData ? (
                            this.state.followedUsersData.map(el => (
                            <div>
                                <FollowedUsers
                                followedUserObj={el} key={key++}
                                />
                            </div>
                            ))
                        ) : null }
                    </div>

                    

                    </div>
                    <div className="display-row">
                        <div className="recent-matches-container">
                            <LowerContainer 
                            userId = {this.props.match.params.id}
                            />
                            
                        </div>
                        <div className="display-column">
                            <div className="recent-stats-component-container">
                                <RecentStats 
                                    userId = {this.props.match.params.id}
                                />
                            </div>
                            <div className="donut-div">
                                <DoughnutGraph 
                                    userId = {this.props.match.params.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                }
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

export default connect(mapStateToProps, mapDispatchToProps)(User)