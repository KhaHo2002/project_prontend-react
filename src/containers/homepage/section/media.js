import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import vtv from '../../../assets/image_media/vtv1.png';
import itc from '../../../assets/image_media/ictnews.png';
import infornet from '../../../assets/image_media/infonet.png';
import suckhoe from '../../../assets/image_media/suckhoedoisong.png';
import vnex from '../../../assets/image_media/vnexpress.png';
import thongtin from '../../../assets/image_media/cuc-cong-nghe-thong-tin-bo-y-te-2.png';
import media from '../../../../src/assets/image_media.jpg';

class Media extends Component {

    render() {

        return (
            <div>
                <>
                    <div className='section-share section-media'>
                        <div className='container'>
                            <div className='section-content'>
                                <div><p className='title-content'>Truyền thông</p></div>

                            </div>
                            <div className="section-image">
                                <div className='section-customer media-item'>
                                    <div className='image' >
                                        <img src={media} alt='' />
                                    </div>
                                    <div className='list_media'>
                                        <ul>
                                            <li>
                                                <img src={vtv} alt='' />
                                            </li>
                                            <li>
                                                <img src={itc} alt='' />
                                            </li>
                                            <li>
                                                <img src={infornet} alt='' />
                                            </li>
                                            <li>
                                                <img src={suckhoe} alt='' />
                                            </li>
                                            <li>
                                                <img src={thongtin} alt='' />
                                            </li>
                                            <li>
                                                <img src={vnex} alt='' />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
