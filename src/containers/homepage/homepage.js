import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './homeheader';

import Specialty from './section/specialty';
import MedicalFacility from './section/medical_facility';
import Doctor_outstanding from './section/doctor_outstanding'

import './homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Handbook from './section/handbook';
import Media from './section/media';
import Homefooter from './homefooter';

class HomePage extends Component {

    render() {
        let settings1 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // initialSlide: 0,

        };
        let settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            // initialSlide: 0,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings={settings1} />
                <MedicalFacility settings={settings1}/>
                <Doctor_outstanding settings={settings1}/>
                <Handbook settings={settings2}/>
                <Media />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
