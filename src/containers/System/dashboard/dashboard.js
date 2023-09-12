import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { countDashboard } from '../../../services/countService';
import './dashboard.scss';
import {
    AreaChart, ResponsiveContainer, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Area
} from 'recharts';
// import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
// import { FormattedMessage } from 'react-intl';
const dataArea = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).add('days').format('dddd - DD/MM/yyyy'),
            listDashboard: []
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let today = this.getCurrentDate();
        let dataDashboard = await countDashboard();
        this.customeData(dataDashboard.data);
        if (today || dataDashboard && dataDashboard.errCode) {
            this.setState({
                today: today
            })
        }
    }

    customeData(data) {
        let listIcon = ['fa-user', 'fa-user-md', 'fa-hospital', 'fa-notes-medical']
        if (data) {
            let changeData = data.map((item, i) => ({ count: item.count, nameEn: item.nameEn, nameVi: item.nameVi, icon: listIcon[i] }));
            this.setState({
                listDashboard: changeData
            })
        }
    }

    getCurrentDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${date}-${month < 10 ? `0${month}` : `${month}`}-${year}`;
    }

    render() {
        let { currentDate, listDashboard } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='dashboard'>
                    <div className='title_dashboard'>
                        <p className='title'>Dashboard</p>
                        <p className='getday'><i className="fas fa-calendar-alt"></i>&ensp;Hôm nay : {currentDate}</p>
                    </div>
                    <div className='list-box row'>
                        {listDashboard && listDashboard.length > 0 &&
                            listDashboard.map((item, index) => {
                                return (
                                    <div className='card-box col-xl-3' key={index}>
                                        <div className='card-item '>
                                            <div className='icon'>
                                                <i className={`fas ${item.icon}`}></i>
                                            </div>
                                            <div className='content'>
                                                <div className='title'>
                                                    {language === LANGUAGES.VI ? item.nameVi : item.nameEn}
                                                </div>
                                                <div className='count'>
                                                    {item.count}
                                                </div>
                                                <div className='day'>
                                                    Jan - Apr 2019
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='chart-report'>
                        <div className='report'>
                            < div className='item'>
                                <span className='data'>50+</span>
                                <p className='desctription'>Total categories</p>
                            </div>
                            < div className='item'>
                                <span className='data'>50+</span>
                                <p className='desctription'>Total categories</p>
                            </div>
                            < div className='item'>
                                <span className='data'>50+</span>
                                <p className='desctription'>Total categories</p>
                            </div>
                            < div className='item'>
                                <span className='data'>50+</span>
                                <p className='desctription'>Total categories</p>
                            </div>
                        </div>
                        <div className='area-chart'>
                            <div className='chart'>
                                <p className='title'>Monthly Income stats for November 2020</p>
                                <AreaChart width={750} height={310} margin={{ top: 10, right: 50, left: 0, bottom: 0 }} data={dataArea}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                </AreaChart>
                            </div>
                        </div>

                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
