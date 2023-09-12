import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModelUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: ''

        }
        this.listenEmitter();
    }

    componentDidMount() {
    }

    listenEmitter() {
        emitter.on('clear_modal', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: ''
            })
        });
    }

    toggle = () => {
        this.props.toggleParent();
    }

    handleOnchange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkDataInput = () => {
        let valid = true;
        let arrayInput = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                valid = false;
                alert(`Missing parameter :${arrayInput[i]}`);
                break;
            }
        }
        return valid;
    }

    handleAddUser = () => {
        let checkValid = this.checkDataInput();
        if (checkValid === true) {
            this.props.createNewUser(this.state);
        }
    }

    render() {

        return (
            <div className="text-center" >
                <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size='lg'>
                    <ModalHeader toggle={() => this.toggle()}>Add User</ModalHeader>

                    <ModalBody>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" aria-label="Username" value={this.state.email} onChange={(event) => { this.handleOnchange(event, "email") }} />&emsp;
                            <input type="text" className="form-control" placeholder="Password" aria-label="Username" value={this.state.password} onChange={(event) => { this.handleOnchange(event, "password") }} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="First name" aria-label="Username" value={this.state.firstName} onChange={(event) => { this.handleOnchange(event, "firstName") }} />&emsp;
                            <input type="text" className="form-control" placeholder="Last name" aria-label="Username" value={this.state.lastName} onChange={(event) => { this.handleOnchange(event, "lastName") }} />
                        </div>
                        <div className="input-group mb-3">

                            <input type="text" className="form-control" placeholder="Phone number" aria-label="Username" value={this.state.phonenumber} onChange={(event) => { this.handleOnchange(event, "phonenumber") }} />
                        </div>
                        <div className="input-group mb-3">

                            <input type="text" className="form-control" placeholder="Address" aria-label="Username" value={this.state.address} onChange={(event) => { this.handleOnchange(event, "address") }} />
                        </div>
                        {/* <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" for="inputGroupSelect01">Gender</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" for="inputGroupSelect01">Role</label>
                            </div>
                            <select className="custom-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleAddUser()}>
                            Add User
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);


