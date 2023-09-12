import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './login.scss';
import { handleLogin } from '../../services/userservice';
import ChangeAccount from './changeAccount';
import { Link } from "react-router-dom";
// import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        // this.btnLogin = React.createRef();  
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        }
    }

    handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLoginOnclick = async () => {
        this.setState({
            errMessage: ''
        })
        let data = await handleLogin(this.state.username, this.state.password);
        try {
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            else if (data && data.errCode === 0) {
                this.props.loginSuccess(data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidenPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    handleKeydow = (event) => {
        if (event.keyCode === 13) {
            this.handleLoginOnclick();
        }
    }

    render() {

        return (
            <div className='login_background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input className='form-control' placeholder='Enter Username' type='text' value={this.state.username} onChange={(event) => this.handleUsernameInput(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input className='form-control' placeholder='Enter password' type={this.state.showPassword ? 'text' : 'password'} value={this.state.password} onChange={(event) => this.handlePasswordInput(event)} />
                                <span onClick={() => this.handleShowHidenPassword()}>
                                    <i className={this.state.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn-login' onKeyDown={(event) => { this.handleKeydow(event) }} onClick={() => { this.handleLoginOnclick() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-pass'><Link to='/change_account'>Forgot your password?</Link></span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or login with :</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        loginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
