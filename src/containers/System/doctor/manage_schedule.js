import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './manage_schedule.scss';
import { FormattedMessage } from "react-intl";
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { createBulkScheduleDoctor } from '../../../services/userservice';
class Manage_doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            selectOption: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchUserAllDoctor();
        this.props.fetchAllcodeTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allDoctor, language, allCodesTime } = this.props;
        let dataSelect = this.buildDataSelect(allDoctor);
        if (prevProps.allDoctor !== allDoctor) {
            this.setState({
                arrDoctor: dataSelect
            })
        }
        if (prevProps.allCodesTime !== allCodesTime) {
            //dung de gan cờ de hien thi cai mau cua button
            let data = allCodesTime;
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelect = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
        // if (prevProps.language !== language) {
        //     this.setState({
        //         arrDoctor: dataSelect
        //     })
        // }
    }

    buildDataSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data) {
            data.map((item, index) => {
                let object = {};
                let lableEn = `${item.lastName} ${item.firstName}`;
                let lableVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    handleChangeOption = async (chooseSelectOption) => {
        this.setState({
            selectOption: chooseSelectOption
        });
    }
    handleOnchangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickChangeColor = (itemCheck) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            let time = rangeTime.map(item => {
                if (item.id === itemCheck.id) {
                    item.isSelect = !item.isSelect;
                    return item;
                } else {
                    
                    return item;
                }
            });
            this.setState({
                rangeTime: time
            });
        }
    }

    // handleSaveSchedule = async () => {
    //     let { rangeTime, selectOption, currentDate } = this.state;
    //     let result = [];
    //     let formatDate = new Date(currentDate).getTime();
    //     if (selectOption && _.isEmpty(selectOption)) {
    //         toast.warn('Invalid doctor');
    //         return;
    //     }

    //     if (!currentDate) {
    //         toast.warn('Invalid date');
    //         return;
    //     }
    //     if (currentDate == "Invalid Date") {
    //         toast.warn(`You can't choose current day`);
    //         return;
    //     }

    //     if (rangeTime && rangeTime.length > 0) {
    //         let selectTime = rangeTime.filter(item => item.isSelect === true);
    //         if (selectTime && selectTime.length > 0) {
    //             selectTime.map((item, index) => {
    //                 let object = {};
    //                 object.doctorid = selectOption.value;
    //                 object.date = formatDate;
    //                 object.timeType = item.keyMap;
    //                 result.push(object)
    //             })
    //         }
    //         else {
    //             toast.warn('Invalid time');
    //             return;
    //         }
    //     }
    //     console.log({
    //         arrSchedule: result,
    //         doctorid: selectOption.value.toString(),
    //         //vi data base luu duoi dang string nen phai format lai thanh chuoi string
    //         date: formatDate.toString()
    //     });
    //     return;
    //     let response = await createBulkScheduleDoctor({
    //         arrSchedule: result,
    //         doctorid: selectOption.value,
    //         //vi data base luu duoi dang string nen phai format lai thanh chuoi string
    //         date: formatDate
    //     });
    //     if (response) {
    //         toast.success("Created schedule");
    //     }
    // }

    handleSaveSchedule = async () => {
        let { rangeTime, selectOption, currentDate } = this.state;
        let result = [];
        let formatDate = new Date(currentDate).getTime();
        if (selectOption && _.isEmpty(selectOption)) {
            toast.warn('Invalid doctor');
            return;
        }

        if (!currentDate) {
            toast.warn('Invalid date');
            return;
        }
        if (currentDate == "Invalid Date") {
            toast.warn(`You can't choose current day`);
            return;
        }

        if (rangeTime && rangeTime.length > 0) {
            let selectTime = rangeTime.filter(item => item.isSelect === true);
            if (selectTime && selectTime.length > 0) {
                selectTime.map((item, index) => {
                    let object = {};
                    object.doctorid = selectOption.value.toString();
                    object.date = formatDate.toString();
                    object.timeType = item.keyMap;
                    result.push(object)
                })
            }
            else {
                toast.warn('Invalid time');
                return;
            }
        }
       
        let response = await createBulkScheduleDoctor({
            arrSchedule: result,
            doctorid: selectOption.value.toString(),
            //vi data base luu duoi dang string nen phai format lai thanh chuoi string
            date: formatDate.toString()
        });
        if (response) {
            toast.success("Created schedule");
            this.setState({
                selectOption:'',
                currentDate:''
            });
        }
    }

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <div className='manage_schedule_container'>
                    <div className='title_schedule'>
                        <FormattedMessage id="manage_schedule.title" />
                    </div>
                    <div className='container option_choose'>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <label className='' >
                                    <FormattedMessage id="manage_schedule.choose_a_doctor" />
                                </label>
                                <Select
                                    value={this.state.selectOption}
                                    onChange={this.handleChangeOption}
                                    options={this.state.arrDoctor} />
                            </div>
                            <div className='col-lg-6'>
                                <label className=''>
                                    <FormattedMessage id="manage_schedule.choose_a_day" />
                                </label>
                                <DatePicker onChange={(event) => this.handleOnchangDatePicker(event)} minDate={yesterday} value={this.state.currentDate} className='form-control' />
                            </div>
                            <div className='col-lg-12 choose_hour'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button onClick={() => { this.handleClickChangeColor(item) }} className={item.isSelect === true ? 'btn btn-time active' : 'btn btn-time'} key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='button_add'>
                            <button className='btn btn-primary' onClick={() => { this.handleSaveSchedule() }}><FormattedMessage id="manage_schedule.save" /></button>
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
        allDoctor: state.admin.allDoctors,
        language: state.app.language,
        allCodesTime: state.admin.allCodeTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserAllDoctor: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeTime: () => dispatch(actions.fetchAllCodesTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage_doctor);
