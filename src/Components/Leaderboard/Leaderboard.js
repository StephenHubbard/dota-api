import React, {Component} from 'react';
import './Leaderboard.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import { Ring } from 'react-awesome-spinners'



class Leaderboard extends Component {
    constructor(props) {
        super(props)
    
    this.state = {
        data: '',
        followedUsersDisplay: [],
        followedUsers: [],
        followedUsersFinal: '',
        thisUserId: '',
        matches100: '',
        didUserWin100: '',
        userWin100: '',
        lineData: {
            labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
            datasets: [
            {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
            }
            ]
        }, 
        followedUsersData: '',
        followedUsersMatches100: '',
        didFollowedUsersWin100: '',

        }
    }

    componentDidMount() {
        let newArr = []
        const id = this.props.account_id
        axios
        .get(`https://api.opendota.com/api/players/${this.props.account_id}`)
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
                    this.getAccountIds() 
                })

            })
        })   
        axios
        .get(`api/users/${id}`)
        .then( res => {
            this.setState({
                thisUserId: res.data[0]
            })
        })
        .catch(err => console.log(err))
        // axios
        // .get(`https://api.opendota.com/api/players/${this.props.account_id}/matches?limit=100`)
        // .then( res => {
        //     this.setState({
        //         matches100: res.data.reverse()
        //     })
        //     this.didUserWin100()
        // })
        // .catch(err => console.log(err))

    }        

    didUserWin100() {
        let newArr = []
        for (let i = 0; i < this.state.matches100.length; i++) {
            if (this.state.matches100[i].player_slot > 99 && this.state.matches100[i].radiant_win === false) {
                newArr.push(true)
            } else if (this.state.matches100[i].player_slot > 99 && this.state.matches100[i].radiant_win === true) {
                newArr.push(false)
            } else if (this.state.matches100[i].player_slot < 99 && this.state.matches100[i].radiant_win === true) {
                newArr.push(true)
            } else if (this.state.matches100[i].player_slot < 99 && this.state.matches100[i].radiant_win === false) {
                newArr.push(false)
            }
        }
        this.setState({
            didUserWin100: newArr
        })
        this.calcMMR()
    }

    calcMMR() {
        let mmr = this.state.data.mmr_estimate.estimate;
        let mmrStart = mmr;
        let newArr = [];
        let newArr2 = [];
        for (let i = 0; i < this.state.matches100.length + 1; i++) {
            if (this.state.didUserWin100[i] === true) {
                mmr = mmr + 25

            } else {
                mmr = mmr - 25

            }
            newArr.push(mmr)
        }
        for (let i = 1; i < 101; i++) {
            newArr2.push(`${i}`)
        }
        this.setState({
            lineData: {
                labels: newArr2,
                datasets: [
                {
                label: `${this.state.data.profile.personaname}`,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: newArr
                }, 
                
                ]
            },
        })
    }

    getAccountIds() {
        this.loopUsers()
        this.delayOne()
    }

    delayOne() {
        setTimeout(this.renderFollowedUsers, 500)

    }
    
    loopUsers() {
        let newArr = []
        for (let i = 0; i < this.state.followedUsers.length; i++) {
            let user_id = this.state.followedUsers[i]
            axios
            .post('/api/followed/users', {user_id})
            .then(res => {
                newArr.push(res.data[0].account_id)
            }) 
        }
        this.setState({
            followedUsersFinal: newArr
        })
    }
    

    renderFollowedUsers = async () => {
        let newArr = []
        for (let i = 0; i < this.state.followedUsersFinal.length; i++) {
            await 
            axios
                .get(`https://api.opendota.com/api/players/${this.state.followedUsersFinal[i]}`)
                .then(res => {
                    newArr.push(res.data)
                })

                this.setState({
                    followedUsersData: newArr
                })
            }    

            let newArr2 = []
            for ( let i = 0; i < newArr.length; i++) {
            await 
            axios 
            .get(`https://api.opendota.com/api/players/${newArr[i].profile.account_id}/matches?limit=100`)
            .then(res => {
                newArr2.push(res.data.reverse())
            })
            newArr2 = newArr2.reverse()
            await this.setState({
                followedUsersMatches100: newArr2
            })
            // await console.log(this.state.followedUsersMatches100)
        }
        await this.didFollowedUserWins100()
    }

    async didFollowedUserWins100() {
        // console.log(this.state.followedUsersMatches100)
        let newArr = []
        for ( let i = 0; i < this.state.followedUsersMatches100.length; i++ ) {
            newArr[i] = []
            for (let k = 0; k < this.state.followedUsersMatches100[i].length; k++) {
                if (this.state.followedUsersMatches100[i][k].player_slot > 99 && this.state.followedUsersMatches100[i][k].radiant_win === false) {
                    newArr[i].push(true)
                } else if (this.state.followedUsersMatches100[i][k].player_slot > 99 && this.state.followedUsersMatches100[i][k].radiant_win === true) {
                    newArr[i].push(false)
                } else if (this.state.followedUsersMatches100[i][k].player_slot < 99 && this.state.followedUsersMatches100[i][k].radiant_win === true) {
                    newArr[i].push(true)
                } else if (this.state.followedUsersMatches100[i][k].player_slot < 99 && this.state.followedUsersMatches100[i][k].radiant_win === false) {
                    newArr[i].push(false)
                }
            }
            // console.log(newArr[i])
            await this.setState({
                didFollowedUsersWin100: newArr
            })
        }
        await this.calcFollowedUsersMMR()
    }

    calcFollowedUsersMMR() {
        let newArr = [];
        let newArr2 = [];
        let newArr3 = [];
        for ( let i = 1; i < 101; i++) {
            newArr2.push(`${i}`)
        }
        for (let i = 0; i < this.state.didFollowedUsersWin100.length; i++) {
            newArr[i] = []
            let mmr = 0
            for (let k = 0; k < this.state.didFollowedUsersWin100[i].length; k++) {
                if (this.state.didFollowedUsersWin100[i][k] === true) {
                    mmr = mmr + 25
                } else {
                    mmr = mmr - 25
                }
                newArr[i].push(mmr)
            }
            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);
            var bgColor = "rgb(" + x + "," + y + "," + z + ")";
            newArr3.push({
                label: `${this.state.followedUsersData[i].profile.personaname}`,
                fill: false,
                lineTension: .1,
                backgroundColor: bgColor,
                borderColor: bgColor,
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'round',
                pointBorderColor: bgColor,
                pointBackgroundColor: bgColor,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: bgColor,
                pointHoverBorderColor: bgColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: newArr[i],
                },)
        }
        this.setState({
            lineData: {
                labels: newArr2,
                datasets: newArr3
            },
        })
    }
        



    render(props) {

        return(
            <div className="leaderboard-page">
                <h1>Leaderboard</h1>



                {/* {this.state.followedUsersDisplay ? (
                    <div className="dashboard-cont">
                        {this.state.followedUsers.map(el => (
                            <User 
                            userObj={el} key={key++}
                            />
                        ))}
                    </div>
                    ) : null } */}

                {this.state.data ? (
                <div className="line-graph">
                    <h2>Last 100 Games</h2>
                    {this.state.didFollowedUsersWin100 ? (
                    <Line data={this.state.lineData} />
                    ) :
                    <div className="loading-ring-leaderboard">
                        <Ring size={200} />
                    </div>
                    }
                </div>
                ) : <h3>Please login to see your Leaderboard</h3> }
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

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)