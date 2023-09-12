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
import './detailclinic.scss';
import { getDetailClinicById } from '../../../services/clinicService';
import _ from 'lodash';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorid: [],
            dataDetailClinic: {},
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let resDetailClinic = await getDetailClinicById(id);
            if (resDetailClinic && resDetailClinic.errCode === 0) {
                let listDoctorid = [];
                let allData = resDetailClinic.data;
                if (allData && !_.isEmpty(allData)) {
                    let arr = allData.arrClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            listDoctorid.push(item.doctorid)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: resDetailClinic.data,
                    arrDoctorid: listDoctorid
                })
            }
        }
    }


    render() {
        let { arrDoctorid, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader isShowBanner={false} />

                < div className='clinic_detail'>
                    <div className='clinic_item-up container'>
                        {Object.keys(dataDetailClinic).length > 0 ?
                            <>
                                <span className='name_clinic'>{dataDetailClinic.name}</span>
                                <p className='address'>{dataDetailClinic.address}</p>
                                <div className='dis_short'>
                                    <span dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHtmlShort }}></span>
                                </div>
                                <div className='doctor_title'>
                                    <p className=''>Bác sĩ</p>
                                </div>
                            </>
                            :
                            <div className='not_data'>Đang cập nhật dữ liệu cho khoa khám này</div>
                        }
                    </div>

                    <div className='infor_schedule-doctor '>

                        {arrDoctorid && arrDoctorid.length > 0 ?
                            <div className='container'>

                                {arrDoctorid.map((item, index) => {
                                    return (
                                        <div className='item' key={index}>
                                            <div className='infor_doctor'>
                                                <ProfileDoctor isShowDescription={false} isShowDetail={true} idDoctor={item} />
                                            </div>

                                            <div className='schedule-doctor ' >
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
                    <div className='clinic_item-down container'>
                        {Object.keys(dataDetailClinic).length > 0 ?
                            <>
                                {dataDetailClinic && dataDetailClinic.descriptionHTML &&
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                }
                            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
