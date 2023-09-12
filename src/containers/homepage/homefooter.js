import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './homefooter.scss';
import logo from '../../assets/bookingcare-2020.svg'

class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className='home-footer'>
                    <div className='container'>
                        <div className='service_location_support'>
                            <div className='service'>
                                <img src={logo} />
                                <ul>
                                    <li>
                                        <b>Công ty Cổ phần Công nghệ BookingCare</b>
                                    </li>
                                    <li>

                                        <p><i className="fas fa-map-marker-alt"></i>&nbsp;Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                                    </li>
                                    <li>

                                        <p><i className="fas fa-check"></i>&nbsp;ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='location'>
                                <ul>
                                    <li><a href='#'>Liên hệ hợp tác</a></li>
                                    <li><a href='#'>Danh bạ y tế</a></li>
                                    <li><a href='#'>Sức khỏe doanh nghiệp</a></li>
                                    <li><a href='#'>Tuyển dụng</a></li>
                                    <li><a href='#'>Câu hỏi thường gặp</a></li>
                                    <li><a href='#'>Điều khoản sử dụng</a></li>
                                    <li><a href='#'>Quy trình hỗ trợ giải quyết khiếu nại</a></li>
                                </ul>
                            </div>
                            <div className='support'>
                                <div className='support1'>
                                    <b>Trụ sở tại Hà Nội</b>
                                    <p>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                                </div>
                                <div className='support2'>
                                    <b>Văn phòng tại TP Hồ Chí Minh</b>
                                    <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                                </div>
                                <div className='support3'>
                                    <b>Hotline</b>
                                    <p>024-7301-2468 (7h - 18h)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='author'>
                    <p>&copy;Website create by <small>Greatest off all time</small></p>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
