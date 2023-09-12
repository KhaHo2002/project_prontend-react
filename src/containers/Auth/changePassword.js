import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './login.scss';
import { changePassword } from '../../services/userservice';
import { withRouter } from 'react-router';
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

    handlePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    componentDidMount() {
        if (this.props.history && this.props.history.location && this.props.history.location.search) {
            let email = this.props.history.location.search.substring(1);
            this.setState({
                username: email
            })
        }
    }
    handleLoginOnclick = async () => {
        this.setState({
            errMessage: ''
        })
        let data = {
            email: this.state.username,
            password: this.state.password
        }
        let res = await changePassword(data);
        if (res || res.errCode === 0) {
            this.props.history.push(`/login`);
        }
    }
    handleShowHidenPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }


    render() {
        return (
            <div className='login_background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Change Password</div>
                        <div className='col-12 form-group login-input'>
                            <label>Your email</label>
                            <input className='form-control' disabled placeholder='Enter Username' type='text' value={this.state.username} onChange={(event) => this.handleUsernameInput(event)} />
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
                            <button type='submit' className='btn-login' onClick={() => { this.handleLoginOnclick() }}>Change Password</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
