import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/handBookService';
import { withRouter } from 'react-router';
class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHandbook: {}
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let dataHandbook = await getAllHandbook();
        if (dataHandbook && dataHandbook.errCode === 0) {
            this.setState({
                listHandbook: dataHandbook.data
            })
        }
    }
    handleViewDetailHandbook = (item) => {
        this.props.history.push(`/detail-handbook/${item.id}`);
    }

    render() {
        let { listHandbook } = this.state;
        return (
            <div>
                <>
                    <div className='section-share section-handbook'>
                        <div className='container'>
                            <div className='section-content'>
                                <div><p className='title-content'>Cẩm nang</p></div>
                                <div>
                                    <button className='view_all'>Xem thêm</button>
                                </div>
                            </div>
                            <div className="section-image">
                                <Slider {...this.props.settings}>
                                    {listHandbook && listHandbook.length > 0 && listHandbook.map((item, index) => {
                                        return (
                                            < div className='section-customer' key={index} onClick={() => this.handleViewDetailHandbook(item)}>
                                                <div className='handbook'>
                                                    <div className='section-item handbook-item' style={{ backgroundImage: `url(${item.image})` }}>
                                                    </div>
                                                    <div className='description'><p className='name_handbook'>{item.name_handbook}</p></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>

                </>
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
