import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './homeheader.scss';
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../utils/constant";
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';
import vn from '../../../src/assets/icons8-vietnam-flag-48.png';
import en from '../../../src/assets/icons8-united-kingdom-48.png';
import { Link } from 'react-router-dom';
class HomeHeader extends Component {



    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnHome = () => {
        if (this.props.history) { this.props.history.push(`/home`); }
    }


    render() {
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left_content'>
                            <i className="fas fa-bars"></i>
                            <div className='logo' onClick={() => this.returnHome()}></div>
                        </div>
                        <div className='center_content'>
                            <div className='child_content'>
                                <Link to={path.LIST_SPECIALIST} className='link'>
                                    <div className=''>
                                        <b><FormattedMessage id="homeheader.specialist" /></b>
                                    </div>
                                    <div className='sub-title'>
                                        <span><FormattedMessage id="homeheader.find_a_specialist" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className='child_content'>
                                <Link to={path.LIST_CLINIC} className='link'>
                                    <div className=''>
                                        <b><FormattedMessage id="homeheader.health_facilities" /></b>
                                    </div>
                                    <div className='sub-title'>
                                        <span><FormattedMessage id="homeheader.choose_hospital_clinic" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className='child_content'>
                                <Link to={path.LIST_DOCTOR_OUTANDING} className='link'>
                                    <div className=''>
                                        <b><FormattedMessage id="homeheader.doctor" /></b>
                                    </div>
                                    <div className='sub-title'>
                                        <span><FormattedMessage id="homeheader.choose_a_good_doctor" /></span>
                                    </div>
                                </Link>
                            </div>
                            <div className='child_content'>
                                <div className=''>
                                    <b><FormattedMessage id="homeheader.checkup_package" /></b>
                                </div>
                                <div className='sub-title'>
                                    <span><FormattedMessage id="homeheader.general_health_check" /></span>
                                </div>
                            </div>
                        </div>
                        <div className='right_content'>
                            <div className='support'>
                                <div> <i className="fas fa-question"></i><span className='title_sup'><FormattedMessage id="homeheader.help" /></span></div>
                                <span className='phone_number'>032706113</span>
                            </div>
                            <div className='language'>
                                <div >
                                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                        <img className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'} src={vn} />
                                    </span>
                                </div>
                                <div >
                                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                        <img className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'} src={en} />
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner'>
                        <div className='content-up'>
                            <div className='list_title'>
                                <div className='title1'>
                                    <FormattedMessage id="homeheader.medical_background" />
                                </div>
                                <div className='title2'>
                                    <b>
                                        <FormattedMessage id="homeheader.comprehensive_health_care" />
                                    </b>
                                </div>
                                <div className='search'>
                                    <div className='input_search'>
                                        <div><i className="fas fa-search"></i></div>
                                        <input type="text" placeholder="Tìm kiếm chuyên khoa" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-dow'>
                            <div className='option'>
                                <div className='option_child'>

                                    <div className='icon'>
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.specialist_examination" />
                                    </div>

                                </div>
                                <div className='option_child'>
                                    <div className='icon'>
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.remote_examination" />
                                    </div>

                                </div>
                                <div className='option_child'>
                                    <div className='icon'>
                                        <i className="far fa-clipboard"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.general_examination" />
                                    </div>

                                </div>
                                <div className='option_child'>
                                    <div className='icon'>
                                        <i className="fas fa-prescription-bottle-alt"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.medical_tests" />
                                    </div>

                                </div>
                                <div className='option_child'>
                                    <div className='icon'>
                                        <i className="far fa-user"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.mental_health" />
                                    </div>

                                </div>
                                <div className='option_child'>
                                    <div className='icon'>
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='title_option'>
                                        <FormattedMessage id="homeheader.surgery_package" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
