import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../src/assets/bookingcare-2020.svg';
import vn from '../../../src/assets/icons8-vietnam-flag-48.png';
import en from '../../../src/assets/icons8-united-kingdom-48.png';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctornMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from "react-intl";
import _ from 'lodash';
import { CommonUtils } from '../../utils';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    changeLanguage = (language, isLoggedIn, userInfo) => {
        this.props.changeLanguageAppRedux(language, isLoggedIn, userInfo);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleid;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctornMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo, isLoggedIn } = this.props;
        // let base64 = Buffer.from(userInfo.image, 'base64').toString('binary');
        return (
            <div className="header-container">
                <div className='logo'>
                    <img src={logo} />
                </div>
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    {/* <Navigator menus={doctornMenu} /> */}
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='language'>
                    <span className='welcome'><FormattedMessage id="homeheader.welcome" />&ensp;{userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>&emsp;
                    <span className='image_admin' style={{ backgroundImage: `url(${userInfo.image})` }}></span>&emsp;&emsp;
                    <span className='' onClick={() => this.changeLanguage(LANGUAGES.VI, isLoggedIn, userInfo)}><img className={language === LANGUAGES.VI ? 'language-vi action' : 'language-vi'} src={vn} /></span>&ensp;
                    <span className='' onClick={() => this.changeLanguage(LANGUAGES.EN, isLoggedIn, userInfo)}><img className={language === LANGUAGES.EN ? 'language-en action' : 'language-en'} src={en} /></span>&emsp;
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} >
                        <i className="fas fa-sign-out-alt" title='Logout'></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language, isLoggedIn, userInfo) => dispatch(actions.changeLanguageApp(language, isLoggedIn, userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
