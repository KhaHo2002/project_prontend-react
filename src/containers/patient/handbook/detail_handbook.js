import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../homepage/homeheader';
import Homefooter from '../../homepage/homefooter';
import './detail_handbook.scss'
import { getDetailHandbook } from '../../../services/handBookService';
class Detail_handBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbook_detail: {}
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            let res = await getDetailHandbook(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    handbook_detail: res.data
                })
            }
        }
    }
    a = document.getElementsByClassName('name-handbook');

    render() {
        let { handbook_detail } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='handbook container'>
                    <div className='handbook-left'>
                        <p className='name-handbook'>{handbook_detail.name_handbook}</p>
                        <div className='des-handbook'>
                            <div className='icon'><i className="far fa-lightbulb"></i></div>&emsp;
                            <span className='content'>
                                {Object.keys(handbook_detail).length > 0 ?
                                    <>
                                        {handbook_detail && handbook_detail.descriptionhtml &&
                                            <div dangerouslySetInnerHTML={{ __html: handbook_detail.descriptionhtml }}></div>
                                        }
                                    </>
                                    :
                                    <div className='not_data'>Đang cập nhật dữ liệu cho khoa khám này</div>
                                }
                            </span>
                        </div>
                        <div className='image-des'>
                            <img src={handbook_detail.image} />
                        </div>
                        <div className='detail-des'>
                            {Object.keys(handbook_detail).length > 0 ?
                                <>
                                    {handbook_detail && handbook_detail.contentHTML &&
                                        <div dangerouslySetInnerHTML={{ __html: handbook_detail.contentHTML }}></div>
                                    }
                                </>
                                :
                                <div className='not_data'>Đang cập nhật dữ liệu cho khoa khám này</div>
                            }
                        </div>
                    </div>
                    <div className='handbook-right'>
                        <div className='title-menu'>
                            <span>Nội dung chính</span>
                        </div>
                        <div className='list-menu'>
                            <li>1. Tiến sĩ, Bác sĩ Vũ Thái Hà</li>
                            <li>2. Phó Giáo sư, Tiến sĩ Phạm Thị Lan</li>
                            <li>3. Thạc sĩ, Bác sĩ Nội trú Thân Trọng Tùy</li>
                            <li>4. Tiến sĩ, Bác sĩ Phạm Thị Mai Hương</li>
                            <li>5. Tiến sĩ, Bác sĩ Bùi Văn Dân</li>
                            <li>6. Thạc sĩ, Bác sĩ Nguyễn Thị Thanh Nhàn</li>
                            <li>7. Thạc sĩ, Bác sĩ Nguyễn Thị Mai Dung</li>
                        </div>
                        <div className='view-more'>
                            <span><i className="fas fa-calendar-alt"></i>&ensp;Xem thêm</span>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail_handBook);
