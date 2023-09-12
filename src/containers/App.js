import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'



import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/login';
import Header from './Header/Header';
import ChangeAccount from './Auth/changeAccount';
import ChangePassword from './Auth/changePassword';
import System from '../routes/System';
import HomePage from './homepage/homepage';
import DetailDoctor from './patient/doctor/detailDoctor'
import Doctor from '../routes/doctor';
import { CustomToastCloseButton } from '../components/CustomToast';
import VerifyEmail from './patient/verify_email';
import DetailSpecialty from './patient/specialty/detailspecialty';
import DetailClinic from './patient/clinic/detailclinic';
import Detail_handbook from './patient/handbook/detail_handbook';
import List_doctorOutanding from './homepage/detail_routerlink/list_doctorOutanding';
import List_clinic from './homepage/detail_routerlink/list_clinic';
import List_specialist from './homepage/detail_routerlink/list_specialist';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: 0,
        };
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    handleScrollPosition = () => {
        this.setState({
            scrollPosition: window.scrollY,
        });
    };

    componentDidMount() {
        this.handlePersistorState();
        window.addEventListener('popstate', this.handlePopState);


    }
    handlePopstate = () => {
        window.scrollTo(0, this.state.scrollPosition);
    }
    componentDidUpdate(prevProps) {

    }
    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopState);
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.CHANGE_ACCOUNT} component={userIsNotAuthenticated(ChangeAccount)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                <Route path={path.DETAIL_HANDBOOK} component={Detail_handbook} />
                                <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
                                <Route path={path.CHANGE_PASSWORD} component={ChangePassword} />
                                <Route path={path.LIST_DOCTOR_OUTANDING} component={List_doctorOutanding} />
                                <Route path={path.LIST_CLINIC} component={List_clinic} />
                                <Route path={path.LIST_SPECIALIST} component={List_specialist} />
                            </Switch>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);