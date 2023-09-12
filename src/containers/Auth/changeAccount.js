import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccount } from '../../services/userservice';

import * as actions from "../../store/actions";
import './login.scss';
import { handleLogin } from '../../services/userservice';
import { LANGUAGES } from '../../utils';
// import { FormattedMessage } from 'react-intl';


class ChangeAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errMessage: ''
        }
    }

    handleUsernameInput = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleChnageCountOnclick = async () => {
        this.setState({
            errMessage: ''
        })
        let res = await getAccount({
            email: this.state.username,
            language: this.props.language
        });
        if (res && res.errCode === 0) {
            let language = this.props.language;
            let alertString = language = LANGUAGES.VI ? "Bạn hãy kiểm tra email của mình!" : "Please check your email!";
            alert(alertString);
            this.setState = ({
                username: '',
                errMessage: ''
            })
        }
    }

    render() {
        return (
            <div className='login_background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Choose account change</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input className='form-control' placeholder='Enter Username' type='text' value={this.state.username} onChange={(event) => this.handleUsernameInput(event)} />
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button type='submit' className='btn-login' onClick={() => { this.handleChnageCountOnclick() }}>Send require</button>
                        </div>
                        {/* <div className='col-12'>
                            <span className='forgot-pass'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or login with :</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccount);
