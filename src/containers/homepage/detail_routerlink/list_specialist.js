import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllSpecialty } from '../../../services/specialtyService';
import { withRouter } from 'react-router';
import HomeHeader from '../homeheader';
import Homefooter from '../homefooter';
import './list_specialist.scss';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialtylist: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialtylist: res.data
            })
        }
    }

    handleViewDetailDoctor = (item) => {
        if(this.props.history){
            this.props.history.push(`/detail_specialty/${item.id}`);
        }
    }

    render() {
        let { dataSpecialtylist } = this.state;
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <>
                    <div className='section-share section-medical_facility'>
                        <div className='container'>
                            <div className='section-content'>
                                <div><p className='title-content'>Chuyên khoa</p></div>
                                <div>
                                    <button className='view_all'>Xem thêm</button>
                                </div>
                            </div>
                            {dataSpecialtylist && dataSpecialtylist.length > 0 &&
                                dataSpecialtylist.map((item, index) => {
                                    return (
                                        <div className="section-image" key={index}>
                                            <div className='list_specialist' onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='image' style={{ backgroundImage: `url(${item.image})` }}>
                                                </div>
                                                <div className='name'>
                                                    <p>{item.namespecialty}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}
                            

                        </div>
                    </div>

                </>
                <Homefooter />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
