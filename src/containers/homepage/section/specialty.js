import React, { Component } from 'react';
import { connect } from 'react-redux';
import './specialty.scss';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/specialtyService';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let response = await getAllSpecialty();
        if (response && response.errCode === 0) {
            this.setState({
                dataSpecialty: response.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleViewDetailDoctor = (item) => {
        if(this.props.history){
            this.props.history.push(`/detail_specialty/${item.id}`);
        }
    }


    render() {
        let { dataSpecialty } = this.state;
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='container'>
                        <div className='section-content'>
                            <div><p className='title-content'>Chuyên khoa phổ biến</p></div>
                            <div>
                                <button className='view_all'>Xem thêm</button>
                            </div>
                        </div>
                        <div className="section-image">
                            <Slider {...this.props.settings}>
                                {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customer' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className='section-item specialty-item' style={{ backgroundImage: `url(${item.image})` }}>

                                            </div>
                                            <span>{item.namespecialty}</span>
                                        </div>
                                    )
                                })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
