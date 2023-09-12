import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../homepage/homeheader';
import HomeFooter from '../homepage/homefooter';
import { verifyBooking } from '../../services/userservice';
import "./verify_email.scss";
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errorCode: 0
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParam = new URLSearchParams(this.props.location.search);
            let token = urlParam.get('token');
            let doctorId = urlParam.get('doctorid');
            let res = await verifyBooking({
                token: token,
                doctorid: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errorCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errorCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }
    render() {
        let { statusVerify, errorCode } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                {statusVerify === false ?
                    <div className='load_data'>
                        Loading data...
                    </div>
                    :
                    <div>
                        {errorCode !== 0 ?
                            <div className='book_error'>Lịch hẹn không tồn tại hoặc đã xác nhận</div>
                            :
                            <>
                                <div className="fix_firework container">
                                    <div class="pyro"><div class="before"></div><div class="after"></div></div>
                                </div>
                                <div className='book_success'>
                                    <p >Xác nhận lịch hẹn thành công thành công!</p>
                                </div>
                            </>
                        }
                    </div>

                }
                <div className='fix_footer'>
                    <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
