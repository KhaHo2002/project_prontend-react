import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CommonUtils } from '../../../utils';
import Select from 'react-select';
import './remedy_modal.scss'

import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';

import ReactFileReader from 'react-file-reader';

class RemadyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            fileData: ''
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataPatient !== this.props.dataPatient) {
            this.setState({
                email: this.props.dataPatient.email
            })
        }
    }
    async componentDidMount() {
        // this.props.getGender();
        if (this.props.dataPatient) {
            this.setState({
                email: this.props.dataPatient.email
            })
        }
    }



    toggle = () => {
        this.props.toggleParent();
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    // handleImage = async (event) => {
    //     let fileImage = event.target.files;
    //     let file = fileImage[0];
    //     if (file) {
    //         let base64 = await CommonUtils.getBase64(file);
    //         this.setState({
    //             imgBase64: base64
    //         })
    //     }
    // }



    handleFileChange = async (event) => {
        const file = event.target.files[0];
    };


    handleFiles = files => {
        let reader = new FileReader();

        reader.onload = event => {
            const fileContent = event.target.result;
            this.setState({
                fileData: fileContent
            });
        };

        reader.readAsText(files[0]); // Pass the File object directly
    }

    handleChangeDataRemedy = () => {
        this.props.sendDataRemedy(this.state);
    }

    render() {
        let { isOpenModal, dataPatient, dataRemedy } = this.props;

        return (
            <>
                <Modal isOpen={isOpenModal} toggle={() => this.toggle()} size='lg' className='modal_container' >
                    <div className="modal-header"><h5 className="modal-title">Modal title</h5><button onClick={() => this.toggle()} type="button" className="btn-close-modal" aria-label="Close"><i className="fas fa-times"></i></button></div>
                    <ModalBody>
                        <div className='row'>
                            <div className="col-lg-6 mb-3">
                                <label>Email bệnh nhân</label>
                                <input type="text" className="form-control" placeholder={dataPatient.email} aria-label="Username" aria-describedby="basic-addon1" value={this.state.email} onChange={(event) => this.handleChangeEmail(event)} />
                            </div>
                            <div className="col-lg-6 mb-3">
                                {/* <label>Chọn file gửi đơn thuốc</label>
                                <input type="file" class="form-control" onChange={(event) => this.handleImage(event)} placeholder="Chọn file gửi đơn thuốc" aria-label="Username" aria-describedby="basic-addon1" /> */}
                                <ReactFileReader fileTypes={['.pdf', '.txt', '.docx']} handleFiles={this.handleFiles}>
                                    <button className='btn'>Upload</button>
                                </ReactFileReader>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.handleChangeDataRemedy() }}>
                            Send
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genderList: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemadyModal);
