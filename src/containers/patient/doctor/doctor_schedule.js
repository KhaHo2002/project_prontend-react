import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import './doctor_schedule.scss';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
// library localization have use
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userservice';
import { FormattedMessage } from 'react-intl';
import Booking_modal from './modal/booking_modal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allCalendar: [],
            isShowModal: false,
            dataModalSchedule: {}
        }
    }

    async componentDidMount() {
        let arrDay = this.getArrDays(this.props.language);
        if (arrDay && arrDay.length > 0) {
            // lay gia tri dau tien cho select
            this.setState({
                allDays: arrDay
            })
        }
        // doan code nay dung de cho component detailspecialty nhau gia tri
        this.getdataScheduleDoctorByDate(this.props.idDoctor);
    }

    getdataScheduleDoctorByDate = async (id) => {
        let allDay = this.getArrDays(this.props.language)
        let res = await getScheduleDoctorByDate(id, allDay[0].value);
        this.setState({
            allCalendar: res.data ? res.data : []
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrDay = this.getArrDays(this.props.language);
            this.setState({
                allDays: arrDay
            })
        }
        if (this.props.idDoctor !== prevProps.idDoctor) {
            let allDay = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.idDoctor, allDay[0].value);
            this.setState({
                allCalendar: res.data ? res.data : []
            })
        }
    }

    getArrDays = (language) => {
        let allDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddmm = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddmm}`;
                    object.label = today
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }
            else if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let ddmm = moment(new Date()).format('DD/MM');
                    let today = `To day - ${ddmm}`;
                    object.label = today
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }
        return allDay;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.idDoctor) {
            let id = this.props.idDoctor;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(id, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allCalendar: res.data ? res.data : []
                })
            }
        }
    }

    handleClickChedule = (time) => {
        this.setState({
            isShowModal: true,
            dataModalSchedule: time
        });
    }

    closeModalBooking = () => {
        this.setState({
            isShowModal: false
        })
    }
    toggleModelUser = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }
    render() {
        let { allDays, allCalendar, isShowModal, dataModalSchedule } = this.state;
        let idDoctor = +this.props.idDoctor;
        let { language } = this.props;
        return (
            <>
                <div className='doctor_schedule '>
                    <div className='all_schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className='all-time'>
                        <div className='text-calendar'>
                            <span><i className="fas fa-calendar-alt"></i>&ensp;<FormattedMessage id="patient.detail_doctor.schedule" /></span>
                        </div>
                        <div className='list-calendar'>
                            {allCalendar && allCalendar.length ?
                                <>
                                    <div className='item-calendar'>
                                        {allCalendar.map((item, index) => {
                                            return (
                                                <button key={index} type='button' className='' onClick={() => this.handleClickChedule(item)}>
                                                    {language === LANGUAGES.VI ? item.timeData.valueVi : item.timeData.valueEn}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className='book_schedule'>
                                        <span className=''><FormattedMessage id="patient.detail_doctor.choose" /> <i className="far fa-hand-point-up"></i> <FormattedMessage id="patient.detail_doctor.book_schedule" /></span>
                                    </div>
                                </>
                                :
                                <span className='no-calendar'><FormattedMessage id="patient.detail_doctor.no_schedule" /></span>}
                        </div>
                    </div>
                </div>

                <Booking_modal isOpen={isShowModal} dataTimeAndDoctor={dataModalSchedule} toggleParent={this.toggleModelUser} dataIdDoctor={idDoctor} closeModal={this.closeModalBooking} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
