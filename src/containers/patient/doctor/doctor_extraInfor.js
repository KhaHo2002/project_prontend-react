import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MdEditor from 'react-markdown-editor-lite';
import './doctor_extraInfor.scss';
import { getDoctorExtraInforById } from '../../../services/userservice';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';



class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ishow: false,
            dataExtraDoctor: {}
        }
    }

    async componentDidMount() {
        // doan code nay dung de cho component detailspecialty nhau gia tri
        if(this.props.idDoctor){
            this.getAlldoctorExtraInfor(this.props.idDoctor);
        }
    }

    getAlldoctorExtraInfor = async (id) => {
        let res = await getDoctorExtraInforById(id);
        if (res && res.errCode === 0) {
            this.setState({
                dataExtraDoctor: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.idDoctor !== prevProps.idDoctor) {
            let res = await getDoctorExtraInforById(this.props.idDoctor);
            if (res && res.errCode === 0) {
                this.setState({
                    dataExtraDoctor: res.data
                })
            }
        }
    }

    showDataDetail = (status) => {
        this.setState({
            ishow: status
        })
    }

    render() {
        let { ishow, dataExtraDoctor } = this.state;
        let { language } = this.props;
        return (
            <>{dataExtraDoctor !== {} ?
                <div className='doctor_extra_infor'>
                    <>
                        <div className='doctor_extra_infor-up'>
                            <h3 className='address'><FormattedMessage id="patient.extra_infor.address_examination" /></h3>
                            <div className='name_clinic'>{dataExtraDoctor && dataExtraDoctor.nameclinic ? dataExtraDoctor.nameclinic : ''}</div>
                            <div className='location'>{dataExtraDoctor && dataExtraDoctor.addressclinic ? dataExtraDoctor.addressclinic : ''}</div>
                        </div>
                        <div className='doctor_extra_infor-down'>
                            {ishow === false &&
                                <>
                                    <span className='title'><FormattedMessage id="patient.extra_infor.price" />:</span>&ensp;
                                    {language == LANGUAGES.VI ?
                                        <>
                                            <span className='price'>{dataExtraDoctor && dataExtraDoctor.priceType && dataExtraDoctor.priceType.valueVi ? <NumberFormat value={dataExtraDoctor.priceType.valueVi} displayType={'text'} thousandSeparator={true} suffix={`VND`} /> : ''}</span>&emsp;
                                        </>
                                        :
                                        <>
                                            <span className='price'>{dataExtraDoctor && dataExtraDoctor.priceType && dataExtraDoctor.priceType.valueEn ? <NumberFormat value={dataExtraDoctor.priceType.valueEn} displayType={'text'} thousandSeparator={true} suffix={`$`} /> : ''}</span>&emsp;
                                        </>
                                    }

                                    <span className='show' onClick={() => this.showDataDetail(true)}><FormattedMessage id="patient.extra_infor.see_deital" /></span>
                                </>
                            }
                            {ishow === true &&
                                <>
                                    <div className='show_data'>
                                        <div className='price_show'>
                                            <p className='title_price'><FormattedMessage id="patient.extra_infor.price" />:</p>

                                            {language == LANGUAGES.VI && dataExtraDoctor && dataExtraDoctor.priceType && dataExtraDoctor.priceType.valueVi ? <NumberFormat className='price' value={dataExtraDoctor.priceType.valueVi} displayType={'text'} thousandSeparator={true} suffix={`VND`} /> : ''}
                                            {language == LANGUAGES.EN && dataExtraDoctor && dataExtraDoctor.priceType && dataExtraDoctor.priceType.valueEn ? <NumberFormat className='price' value={dataExtraDoctor.priceType.valueEn} displayType={'text'} thousandSeparator={true} suffix={`$`} /> : ''}
                                            &emsp;
                                        </div>
                                        <div className='discription'>
                                            {dataExtraDoctor && dataExtraDoctor.note ? dataExtraDoctor.note : ''}
                                        </div>
                                        <div className='method_pay'>
                                            <FormattedMessage id="patient.extra_infor.patients_can_pay_with" /> :&ensp;
                                            {language == LANGUAGES.EN && dataExtraDoctor && dataExtraDoctor.payment && dataExtraDoctor.payment.valueEn ? dataExtraDoctor.payment.valueEn : ''}
                                            {language == LANGUAGES.VI && dataExtraDoctor && dataExtraDoctor.payment && dataExtraDoctor.payment.valueVi ? dataExtraDoctor.payment.valueVi : ''}
                                        </div>
                                    </div>
                                    <div className='hide' onClick={() => this.showDataDetail(false)}><FormattedMessage id="patient.extra_infor.hide_list" /></div>
                                </>
                            }
                        </div>

                    </>
                </div>
                :
                <>
                    <div className='not_data'>
                        <p>Chưa có dữ liệu</p>
                    </div>
                </>}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserAllDoctor: () => dispatch(actions.fetchAllDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
