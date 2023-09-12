import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModelEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            email: '',
            // password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: ''

        }
    }

    componentDidMount() {

        let user = this.props.curentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                // password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phonenumber: user.phonenumber,
                address: user.address
            })
        }
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
        let arrayInput = ['email', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrayInput.length; i++) {
            if (!this.state[arrayInput[i]]) {
                valid = false;
                alert(`Missing parameter :${arrayInput[i]}`);
                break;
            }
        }
        return valid;
    }

    handleEditUser = () => {
        let checkValid = this.checkDataInput();
        if (checkValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <div className="text-center" >
                <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} size='lg'>
                    <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>

                    <ModalBody>
                        <div className="input-group mb-3" >
                            <input disabled type="email" className="form-control" placeholder="Email" aria-label="Username" value={this.state.email} onChange={(event) => { this.handleOnchange(event, "email") }} />&emsp;
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleEditUser()}>
                            Save change
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelEdit);


