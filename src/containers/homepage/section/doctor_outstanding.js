import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import './doctor_outstanding.scss';
import { withRouter } from 'react-router';
import { path } from '../../../utils';
class Doctor_outstanding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: []
        }
    }


    componentDidMount() {
        this.props.loadTopDoctor();
        this.props.fetUserAll();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataTopDoctor !== this.props.dataTopDoctor) {
            this.setState({
                arrDoctor: this.props.dataTopDoctor
            })
        }
    }

    handleViewDetailDoctor = (item) => {
        this.props.history.push(`/detail-doctor/${item.id}`);
    }

    render() {
        let listDoctor = this.state.arrDoctor;
        let language = this.props.language;
        return (
            <div>
                <>
                    <div className='section-share section-doctor-outstanding'>
                        {listDoctor && listDoctor.length > 0 ?

                            <div className='container'>
                                <div className='section-content'>
                                    <div><p className='title-content'><FormattedMessage id="homepage.out_standing_doctor" /></p></div>
                                    <div>
                                        <button className='view_all'><FormattedMessage id="homepage.more_infor" /></button>
                                    </div>
                                </div>
                                <div className="section-image">
                                    <Slider {...this.props.settings}>
                                        {listDoctor && listDoctor.length > 0
                                            && listDoctor.map((item, index) => {
                                                return (
                                                    <div className='section-customer ' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                        <div className='section-item doctor_outstanding-item' style={{ backgroundImage: `url(${item.image})` }}>
                                                            {/* <img src='https://cdn.bookingcare.vn/fr/w500/2022/07/14/155206-logo-y-duoc-1.jpg' /> */}
                                                            {/* style={{ backgroundImage: `url(${this.state.image})` */}
                                                        </div>
                                                        <span className='position'>
                                                            {language === LANGUAGES.VI ? `${item.positionData.valueVi} ${item.firstName} ${item.lastName}` : `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`}
                                                        </span>
                                                        <p className='specialize'>Tai Mũi Họng</p>
                                                    </div>
                                                )
                                            })
                                        }

                                    </Slider>
                                </div>
                            </div>
                            :
                            <div className='icon_loading'>
                                <i className="fa fa-spinner" aria-hidden="true"></i>
                            </div>
                        }
                    </div>
                </>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        dataTopDoctor: state.admin.doctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchAllTopDoctor()),
        fetUserAll: () => dispatch(actions.fetchAllUser()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor_outstanding));
