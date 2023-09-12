import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../homepage/homeheader';
import Homefooter from '../../homepage/homefooter';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Doctor_schedule from '../doctor/doctor_schedule';
import Doctor_extraInfor from '../doctor/doctor_extraInfor';
import ProfileDoctor from '../doctor/profile_doctor';
import './detailspecialty.scss';
import { getAllCodes } from '../../../services/userservice';
import { getDetailSpecialtyById } from '../../../services/specialtyService';
import _ from 'lodash';
class SpecialtyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorid: [],
            dataDetaiSpecialty: {},
            listProvice: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let data = {
                id: id,
                location: 'ALL'
            }
            let resDetailSpecialty = await getDetailSpecialtyById(data);
            let resProvice = await getAllCodes('PROVINCE');
            if (resDetailSpecialty && resDetailSpecialty.errCode === 0 && resProvice && resProvice.errCode === 0) {
                let listDoctorid = [];
                let allData = resDetailSpecialty.data;
                if (allData && !_.isEmpty(allData)) {
                    let arr = allData.arrDoctor;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            listDoctorid.push(item.doctorid)
                        })
                    }
                }
                //them gia tri Toan Quoc cho listProvice de sho du lieu
                if (resProvice.data) {
                    resProvice.data.unshift({
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "Nationwide",
                        valueVi: "Toàn quốc"
                    })
                }

                this.setState({
                    dataDetaiSpecialty: resDetailSpecialty.data,
                    arrDoctorid: listDoctorid,
                    listProvice: resProvice.data
                })
            }
        }
    }

    handleOnchange = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let data = {
                id: id,
                location: location
            }
            let resDetailSpecialty = await getDetailSpecialtyById(data);
            if (resDetailSpecialty && resDetailSpecialty.errCode === 0) {
                let listDoctorid = [];
                let allData = resDetailSpecialty.data;
                if (allData && !_.isEmpty(allData)) {
                    let arr = allData.arrDoctor;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            listDoctorid.push(item.doctorid)
                        })
                    }
                }

                this.setState({
                    dataDetaiSpecialty: resDetailSpecialty.data,
                    arrDoctorid: listDoctorid
                })
            }
        }
    }

    render() {
        let { arrDoctorid, dataDetaiSpecialty, listProvice } = this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />

                < div className='specialty_detail'>
                    <div className='des_specialty container'>
                        {Object.keys(dataDetaiSpecialty).length > 0 ?
                            <>
                                {dataDetaiSpecialty && dataDetaiSpecialty.descriptionHtml &&
                                    <div dangerouslySetInnerHTML={{ __html: dataDetaiSpecialty.descriptionHtml }}></div>
                                }</>
                            :
                            <div className='not_data'>Đang cập nhật dữ liệu cho khoa khám này</div>
                        }
                    </div>

                    <div className='infor_schedule-doctor '>
                        <div className='select_choose_provice container'>
                            <select onChange={(event) => this.handleOnchange(event)}>
                                {listProvice && listProvice.length > 0 &&
                                    listProvice.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {arrDoctorid && arrDoctorid.length > 0 ?
                            <div className='container'>

                                {arrDoctorid.map((item, index) => {
                                    return (
                                        <div className='item'>
                                            <div className='infor_doctor'>
                                                <ProfileDoctor isShowDescription={false} isShowDetail={true} idDoctor={item} />
                                            </div>

                                            <div className='schedule-doctor ' key={index}>
                                                <div className='scheule-doctor-left'>
                                                    <Doctor_schedule
                                                        idDoctor={item}
                                                    />
                                                </div>
                                                <div className='schedule-doctor-right'>
                                                    <Doctor_extraInfor
                                                        idDoctor={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className='not_data'>Đang cập nhật dữ liệu cho khoa khám này</div>
                        }
                    </div>

                </div >
                <div className='question'>
                    <span className='container '>Cần tìm hiểu thêm? <span className='view_question'>Xem câu hỏi thường gặp.</span></span>
                </div>
                <div className='footer'>

                    <Homefooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
