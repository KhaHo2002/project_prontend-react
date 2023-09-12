import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/clinicService';
import { withRouter } from 'react-router';
import HomeHeader from '../homeheader';
import Homefooter from '../homefooter';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let resClinic = await getAllClinic();
        if (resClinic && resClinic.errCode === 0) {
            this.setState({
                dataClinic: resClinic.data
            })
        }
    }

    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail_clinic/${item.id}`);
        }
    }

    render() {
        let { dataClinic } = this.state;
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <>
                    <div className='section-share section-medical_facility'>
                        <div className='container'>
                            <div className='section-content'>
                                <div><p className='title-content'>Cơ sở y tế nổi bậc</p></div>
                                <div>
                                    <button className='view_all'>Xem thêm</button>
                                </div>
                            </div>
                            <div className="section-image row">
                                {dataClinic && dataClinic.length > 0 &&
                                    dataClinic.map((item, index) => {
                                        return (
                                            <div className='list_specialist col-lg-3'>
                                                <div className='section-customer  item' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                                    <div className='section-item medical_facility-item' style={{ backgroundImage: `url(${item.image})` }}>
                                                    </div>
                                                    <span className='name_clinic'>{item.name}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
