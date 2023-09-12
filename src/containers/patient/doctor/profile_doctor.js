import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userservice';
import NumberFormat from 'react-number-format';
import "./profile_doctor.scss";
import moment from 'moment';
import _ from 'lodash';
class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idDoctor !== prevProps.idDoctor) {
            // let data = this.getInforDoctor(this.props.idDoctor);
            // this.setState({
            //     dataProfile: data
            // })
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.idDoctor);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/yyyy') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/yyyy');
            let time = language === LANGUAGES.VI ? dataTime.timeData.valueVi : dataTime.timeData.valueEn;
            return (
                <>
                    <div className='time_date'><span className='time'>{time}</span>&emsp;{date}</div>
                    <div className='free_book'>Miến phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescription, timeData, isShowDetail, idDoctor } = this.props;
        let nameVi = '';
        let nameEn = '';
        let priceVi = '';
        let priceEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.lastName} ${dataProfile.firstName}`;
            priceVi = `${dataProfile.doctorinfor.priceType.valueVi}`;
            priceEn = `${dataProfile.doctorinfor.priceType.valueEn}`;
        }
        return (
            <>
                <div className='intro-doctor'>
                    <div className='left'>
                        <div className='image-doctor' style={{ backgroundImage: `url(${dataProfile.image})` }}></div>
                        {isShowDetail === true &&
                            <div className='view_detail'>
                                <Link to={`/detail-doctor/${idDoctor}`}>Xem chi tiết</Link>
                            </div>
                        }
                    </div>
                    <div className='right'>
                        <div className='infor'>
                            <span className='name-doctor'>Họ và tên bác sĩ: {language === LANGUAGES.VI ? nameVi : nameEn}</span><br />
                            {isShowDescription === true ?
                                <span>{dataProfile && dataProfile.markdown && dataProfile.markdown.descriptions ? dataProfile.markdown.descriptions : ''}</span>
                                :
                                <>
                                    <span>{dataProfile && dataProfile.markdown && dataProfile.markdown.descriptions ? dataProfile.markdown.descriptions : ''}</span>
                                    {this.renderTimeBooking(timeData)}
                                    <p className='price'>Giá khám: <span>{language === LANGUAGES.VI ? <NumberFormat className='price' value={priceVi} displayType={'text'} thousandSeparator={true} suffix={`VND`} /> : <NumberFormat className='price' value={priceEn} displayType={'text'} thousandSeparator={true} suffix={`$`} />}</span></p>
                                </>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
