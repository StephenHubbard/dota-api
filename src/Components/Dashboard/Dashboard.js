import React, {Component} from 'react';
import './Dashboard.css';
import axios from 'axios';
import User from '../User/User';
import AddUserInput from '../Inputs/AddUserInput';



export default class Dashboard extends Component {
    constructor() {
        super()
    
        this.state = {
            users: [],
            heroes: '',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        axios
        .get('/api/users')
        .then(res => {
            this.setState({
                users: res.data
            })
        })
        
    }

    // componentDidUpdate() {
    //     console.log(this.state.users)
    //         let users = this.state.users.map(function(el, i) {
    //             console.log(el)
    //         })
    // }

    
    

    render() {
        let users = this.state.users.map(function(el, i) {
            return (
                <User
                    userObj={el}
                    key={i}
                />
            )
        })
        let key = 0;
        return (
            <div className="dashboard">
                
                <div className="input-and-dashboard-cont">
                    <AddUserInput 
                        componentDidMountDashboard = {this.componentDidMount}
                    />
                    <h1 className="registered-users">Registered Users</h1>

                    {this.state.users ? (
                    <div className="dashboard-cont">
                        {users}
                    </div>
                    ) : null }     
                </div>
                
                <a href="https://docs.opendota.com/">
                    <div className="open-dota-container">
                        <h3>Powered By: Open Dota Api</h3>
                        <img className="open-dota" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAA21BMVEXG8/4AxZ4AAADL9P8Awpl/4dgAwZap7fDI9f/J9/8Ax6AAzaSM4tvL+f8AV0UACgm96POs09zC7vl7l542QkWRsrq68PlE0bkby6uX5+YfyqhmfYMGpIUHNS0PExSewstviY9ATlJbcHW44u1HV1sjKy1TZmtc18QEupYpMjSWuMAWGx2e6Omx7vQ3zrFv2sxk2swEc1wGhm0FqYkDPTKFpKsLXU4Jcl4Gh24fJicEGhYHSDtDUlUFmnyw2eOBnqUDKyNy0sgrfG1jvrR4ra9jsqsAHxkANisrSUcgzMDoAAAJdUlEQVR4nO2deVvqOhDGQwl0kSKiWKgLHnHhKLIIqEcv6t30fv9PdFPQ+7h0srY0ze3777Gn+ZFkZjJJMwgVKlSoUKFChQoVKlSoUKFC6am8VNatSFJ27bM6nc7Atq92kSGg5Uq19Eme54XtYRCMR5XaIMLMuoWKKldwKU44Qg2HwXnFRrnuSgjwP9Bq1RuOo67MuqWSYgGuKL2gZu/msx+5ACPEYTAa5BGRE3CpMBjZuWMUASQdidud3aybLCYxwCXi2M5TL4oCRozt2m5+ECUAiYccjq/ygigFGI3U8VXWTeeTJGA0UCu56EVpQKIgD9ZGBbAUjvS3NkqAS4OaNQFDaoAEMRhkjUCXKmAJh7WsGahSBiQzsaJzgJoAYKk67GSNASsJQDJMK9ramkQASfB2njUIpIQAS/hc06QGCOiJEg7trFm+yfF9t/l7PKDXL3kbQpBkLaxVHxK4Xmv76PiPjdjmbtRvJtfT0oYAJA71IXR81No72bm0LKsOAJJ/2nye3Vz3NzxeRl0IHbfRmx9ab4IAN9//4GZKRisno1fJGo70XXOrdXZpWdyAljWb7Pc5Eb1atn3o+L353o71URyAlnVfv57yIXpZjlLHbxztHFqWOCDRc32fy+BkNw8dp7dnfRcvINHBlMs7jrLhcxvz0xg+EUBr85ZnoGYySh3/4uzr4BQHjOwNRye2157IcPzHvcvYBosCWtYDeyriYM187mPc5JMEJOZmwepFvN61hb/1E+aTALSsOxbhOh2+43Z/UNoqBbg56TMIw7U5fLe594vGJwVIPAZrJobrMjSP8bZTFdCyrunDFA/XksRwu/TuUwC0bhkTcS3TsLXDaqY84D1jIg7T35vxt1njUwXQ2pzR+zDtkM1pHrHxVACJR5xSCdMdpE6Di08J0JpRCXGqQWnziKuJaoDWA20epmpJfb7+UwW0HmjzMM31/TYnnyqgdUDpQzxMbSN/zmE/V7qBs2qcvxBtlKZlZ7q08PqDTs+e/gSOU/51RA1hP4jm8dupdKHb5Gxbq9eAUvdVu9nYYocJS+3HD4Ll71RJYRY6zROOVp2ePDV8B9ybqNpl5LoXxzyM95RBGibPh5rH7Db93Ou6BA/efKkut1Jcv7f9G/t/O4DdIT5P3FW4c6YBPD3qInf113TAaDn5OOcIaOE+TNxVuNT1+1LHvab7/ucsQPIfokaLaZOvwTFaSroLm5T8y1KH8+XY5AZc5qxYVmsT7sJwkGgX+l1GU85an/6eB5AgbrF+NsCdliJDmiSf02RMmO2e++kBPkDieVqMToR9RaIRKcOC/moh5/MDnIDkp3s8o/7XM3CQJrmo8Okh6M6W//UJbkBiT+nxO7iwwO3EAJ0e9Vc+7X7jEwAk45Q6SjcXYBcmNkYdqj0/6brfHxEBdGgZcmJnMEBYTcwVNmgx2o+tGD4hQGJqqKN0HxqjSe1V+C3K23cev49PUUDGOvoANKQJeQqfFsN8ty8ygPR5CIWkOEhkFjo9yrv34vnEAWmBxC3Uhe1Eohna8DlqOPEPiQIi9AS/5RX0hUkcmnUoafq9ZpyBkQP0W9BeKom5oTGaRMTdgH3gz1gDKgmInGPwRWCetK0O6FCWSdAElAN0t8AXWXfQGFU/iuhSfAQ0AeUAkQ93IRSvJZCboTj5FtyBUoBODx4swBjFQ1VA5xF850mD8pwMIEIt0J5BnsJT5KNEMZcXtOfkAOG0wTMAiFUTpPC8OG4mD+hfgK4inq9UVV0U+tAL49ZIyoDIB30SsGjCYzVA2HSfgS5QBdC9gN4HJWcCNUB4KX9B7UBZQORCK09oX1sxMwMPGXoHSgOCcx7a1g4VXT20ijmhd6B8D0KrintgEqodlIXjNJqTVwGEnf0kHtBTimXACP/wEY7SlABhV3gDRGtKp0pAG3NGi2KUAMHYF9pqUloxgSnLbdaT8oDg8hOYhCr79WA+9PCCYUTlAZ0tyK4BO00qaQsH2mw+YU1BeUDUOAYAb+MBPYXPRN0LwO0esfgUAF1o3kO7oSp5mTnwrieGk1AC7MZ+pgCenMEqZhT4MQ9ZXlAF0OkB8+IleUAoo/4rbjciKUCEgOMJwKELPJb3E5DTpWTTEgAE418AUMERQhnDnV6KRgb5UCwT7+lV8vcgICuOUQOEoosUAIGM2g41W1EAsgAhR1gA5gVwjUPUeCOTCzeh4AeNd/TGh2rGB9vGL5eMX/DqlrKIBVRJWRifdDI+bWh+4tf41L1Wmy/xO6Bqmy/Gb5+ZvwFq/Ba28YcQjD9G8j84CGT6US7X9MN4xh+nNP9ALLgmtAw50mz8oXTzPysw/sMQ8z/tMf7jLPM/rzP+A8n0P3Gl8q3hE1fjP1I2/jNz8y8KMP+qB/ZlHSf5vqwjletWkE7XrZh/YY7xVx7xXVp1muNLq8y/dkz04riY1nmezhfHEUEHIL7q9Ozp72nf2/CWWtaJJtrwcH9f56v/kMjljZuz+u3kbjHt96Ox2u9P9xfXk/rDM+/z2VzeKHD95ory5fn59XU2e319fX65F3oUTlOkev0m/wWqisrsAlXuK3AV+TK7Apf7EmMlZXmJMe811CrK9BpqxHmRuLyyvkg8EsdV8NLS4Cp4rsv8paXFZf4c5RhkpUc5Bo6CGnLSp6AGsySKjHQqiYJYRW1kpFVRG8QoSyQu7coS0QtLiUrHwlIoyj1ApcHEpGlpsCViY648FTUu7kbkoNjyfALSuzwfAgos8kr/AosrxG8lMrmUkxKZK8QvRU45NJss8lLkdMX4qUwtUzkrU7vSh0LDFIkWGs54/n3Re6nof17icjf3r/kuFb3Sqtj3/mJxN5nc1OsPkeo3t5PrxWIxXRb7Fqn2rVux7zdFqfuIo/+uKP37lucWko7l2iO9bb54HyRI9sZ3jnTsP3j7TFDeutcP3EoEEIeVNSUoxJUEYHWo8HFn2koAMKyU9Zx+SykD4jCRw66pSRUQB4OsEehSA8TtmrbW5U1KgOEok+SEkFQAA1t7PAVA3K6sY3dFWZKAGI/T235PVFKA3nCci96LJAEYmc684IkDYtwe58G2/CcxQILX0d3xfZEIYBiMbJ3DzlhxAmJvGIwGuaNDnIDYC2r2bh7x2IC4WiVOYbCraUKCLQgQR3macBicV2xUzmffrVSuVD+TeYSrPQyC8ahSizoux2wr2bXP6nQ6A9u+itDyDxejctlQsEKFChUqVKhQoUKFChUqpKf+Ba3qMzSBuZcVAAAAAElFTkSuQmCC" alt="open dota logo" />
                    </div>    
                </a>

            </div>
        )
    }
}