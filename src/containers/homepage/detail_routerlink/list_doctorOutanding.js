import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../homepage/homeheader';
import { Link } from 'react-router-dom';
import './list_doctorOutanding.scss';
import { FormattedMessage } from 'react-intl';
import { getDoctorHome } from '../../../services/userservice';
import { LANGUAGES } from '../../../utils';
class ListDoctorOutanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        let res = await getDoctorHome(10);
        if (res && res.errCode === 0) {
            this.setState({
                listDoctor: res.data
            })
        }
    }
    render() {
        let { language } = this.props;
        let { listDoctor } = this.state;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='list_doctor-outanding container'>
                    <h4>Bác sĩ nỗi bậc</h4>
                    {listDoctor && listDoctor.length > 0 &&
                        listDoctor.map((item, index) => {
                            return (

                                <div className='item' key={index}>
                                    <div className='image' style={{ backgroundImage: `url(${item.image})` }}>

                                    </div>
                                    <div className='des'>
                                        <Link to={`/detail-doctor/${item.id}`} className='link'>
                                            <p className='name_doctor'>
                                                {language === LANGUAGES.VI ? `${item.positionData.valueVi} ${item.firstName} ${item.lastName}` : `${item.positionData.valueEn}${item.lastName} ${item.firstName}`}
                                            </p>
                                            <span className='degree'>
                                                {item.doctorinfor.note}
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })

                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctorOutanding);
