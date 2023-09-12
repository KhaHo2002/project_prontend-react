import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import ProfileDoctor from '../profile_doctor';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { createPatienBooking } from '../../../../services/userservice';

import "./booking_modal.scss";
import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            phoneNumber: '',
            email: '',
            address: '',
            resson: '',
            birthday: '',
            doctorid: '',
            arrGender: [],
            selectGender: '',
            timeType: ''
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genderList !== prevProps.genderList) {
            this.setState({
                arrGender: this.buildDataGender(this.props.genderList)
            })
        }
        if (this.props.language !== prevProps.language) {
            this.setState({
                arrGender: this.buildDataGender(this.props.genderList)
            })
        }
        if (this.props !== prevProps) {
            this.setState({
                doctorid: this.props.dataIdDoctor,
                timeType: this.props.dataTimeAndDoctor.timeType
            })
        }
    }
    async componentDidMount() {
        this.props.getGender();
    }

    buildDataGender = (data) => {
        let language = this.props.language;
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    toggle = () => {
        this.props.toggleParent();
    }

    handleEventInput = (event, id) => {
        let dataCopy = { ...this.state };
        dataCopy[id] = event.target.value;
        this.setState({
            ...dataCopy
        })
    }

    handleOnchangDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeOptionGender = (data) => {
        this.setState({
            selectGender: data
        })
    }

    handleCreateBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTimeAndDoctor);
        let nameDoctor = this.buildDoctorName(this.props.dataTimeAndDoctor);
        let response = await createPatienBooking({
            fullname: this.state.fullname,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            resson: this.state.resson,
            date: this.props.dataTimeAndDoctor.date,
            birthday: date,
            doctorid: this.state.doctorid,
            selectGender: this.state.selectGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeBooking: timeString,
            nameDoctor: nameDoctor
        });

        if (response && response.errCode === 0) {
            toast.success("Create booking suscess");
            this.props.closeModal();
        }
        else {
            toast.error("Create booking error");
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/yyyy') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/yyyy');
            let time = language === LANGUAGES.VI ? dataTime.timeData.valueVi : dataTime.timeData.valueEn;
            return (
                `${time}&ensp;${date}`
            )
        }
        return '';
    }
    buildDoctorName = (data) => {
        let { language } = this.props;
        if (data && !_.isEmpty(data)) {
            let name = language === LANGUAGES.VI ? `${data.doctorData.lastName} ${data.doctorData.firstName}` : `${data.doctorData.firstName} ${data.doctorData.lastName}`
            return name;
        }
        return '';
    }

    render() {
        let { isOpen, closeModal, dataIdDoctor, dataTimeAndDoctor } = this.props;
        return (
            <>
                <Modal centered backdrop={true} isOpen={isOpen} toggle={() => this.toggle()} size='lg' className='modal_container'>
                    <div className='modal_booking'>
                        <div className='modal_header'>
                            <span className='title'>Thông tin đặt lệnh khám bệnh</span>
                            <span className='icon'><i className="fas fa-times" onClick={closeModal}></i></span>
                        </div>
                        <div className='modal_body'>
                            <div className='name_doctor_price'>
                                <div className='doctor_name'>
                                    <ProfileDoctor isShowDetail={false} timeData={dataTimeAndDoctor} idDoctor={dataIdDoctor} isShowDescription={false} />
                                </div>

                            </div>
                            <div className='input_data'>
                                <form>
                                    <div className='row mb-3'>
                                        <div className="col">
                                            <label>Họ tên:</label>
                                            <input type="text" className="form-control" placeholder="Họ tên" value={this.state.fullname} onChange={(event) => this.handleEventInput(event, 'fullname')} />
                                        </div>
                                        <div className="col">
                                            <label>Số điện thoại:</label>
                                            <input type="text" className="form-control" placeholder="Số điện thoại" value={this.state.phoneNumber} onChange={(event) => this.handleEventInput(event, 'phoneNumber')} />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className="col">
                                            <label>Địa chỉ email:</label>
                                            <input type="text" className="form-control" placeholder="Địa chỉ email" value={this.state.email} onChange={(event) => this.handleEventInput(event, 'email')} />
                                        </div>
                                        <div className="col">
                                            <label>Địa chỉ liên hệ:</label>
                                            <input type="text" className="form-control" placeholder="Địa chỉ liên hệ" value={this.state.address} onChange={(event) => this.handleEventInput(event, 'address')} />
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className="col">
                                            <label>Lý do khám</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={this.state.resson} onChange={(event) => this.handleEventInput(event, 'resson')}></textarea>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className="col">
                                            <label>Ngày sinh:</label>
                                            <DatePicker className="form-control" onChange={(event) => this.handleOnchangDatePicker(event)} value={this.state.birthday} />
                                        </div>
                                        <div className="col">
                                            <label>Giới tính:</label>
                                            <Select
                                                value={this.state.selectGender}
                                                onChange={this.handleChangeOptionGender}
                                                options={this.state.arrGender}
                                            // placeholder={'Chọn giới tính'}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='modal_footer'>
                            <button type="button" className="btn cancel" onClick={closeModal}>Cancel</button>
                            <button type="button" className="btn add" onClick={() => this.handleCreateBooking()}>Lưu</button>
                        </div>
                    </div>
                </Modal>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderList: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
