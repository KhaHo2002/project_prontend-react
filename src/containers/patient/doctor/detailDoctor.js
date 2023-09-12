import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../homepage/homeheader';
import Homefooter from '../../homepage/homefooter';
import { getDetaiInforDoctor } from "../../../services/userservice";
import './detaildoctor.scss';
import { LANGUAGES } from '../../../utils';
import Doctor_schedule from './doctor_schedule';
import Doctor_extraInfor from './doctor_extraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentIdDoctor: -1
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        window.scrollTo(0, 0);
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            // dùng để setstate để cho id truyền qua component Doctor_schedule ko phải chờ để có dữ liệu ngay
            this.setState({
                currentIdDoctor: id
            })

            let response = await getDetaiInforDoctor(id);
            if (response && response.errCode === 0) {
                this.setState({
                    detailDoctor: response.data
                })
            }

        }
        
    }
    render() {
        let { detailDoctor, currentIdDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail '>
                    <div className='intro-doctor container'>
                        <div className='left'>
                            <div className='image-doctor' style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
                        </div>
                        <div className='right'>
                            <div className='name-doctor'>
                                <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                            </div>
                            <div className='infor'>
                                {detailDoctor.markdown && detailDoctor.markdown.descriptions &&
                                    <span>{detailDoctor.markdown.descriptions}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor container'>
                        <div className='scheule-doctor-left'>
                            <Doctor_schedule
                                idDoctor={currentIdDoctor}
                            />
                        </div>
                        <div className='schedule-doctor-right'>
                            <Doctor_extraInfor
                                idDoctor={currentIdDoctor}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        <div className='container'>
                            {detailDoctor.markdown && detailDoctor.markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.markdown.contentHTML }}></div>
                            }
                        </div>
                    </div>
                    <div className='commet-doctor container'>

                    </div>
                </div>
                <Homefooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
