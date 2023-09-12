import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../homepage/homeheader';
import Homefooter from '../../homepage/homefooter';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
       
    }
    render() {
        

        return (
            <>
                <HomeHeader isShowBanner={false} />
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
