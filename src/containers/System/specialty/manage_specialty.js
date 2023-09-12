import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES, CommonUtils, CRUD_ACTION } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import * as actions from '../../../store/actions';
import MdEditor from 'react-markdown-editor-lite';
import "./manage_specialty.scss";
import { handleCreatespecialty, editSpecialty, upCloundImageSpecialty, deleteSpecialty } from '../../../services/specialtyService';
import { toast } from 'react-toastify';
import { getAllSpecialty } from '../../../services/specialtyService';
import Lightbox from 'react-image-lightbox';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name_specialty: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionMarkdown: '',
            listSpecialtys: [],
            isOpenImage: false,
            action: CRUD_ACTION.CREATE,
            idimage: ''
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // const { language, arrRequireDoctorInfors } = this.props;
        // if (prevProps.arrRequireDoctorInfors !== arrRequireDoctorInfors) {
        //     this.setState({
        //         listSpecialtys: arrRequireDoctorInfors,
        //         action: CRUD_ACTION.CREATE
        //     })
        // }

    }
    fetchAllSpecialty = async () => {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                listSpecialtys: res.data
            })
        }
    }
    async componentDidMount() {
        // this.props.fetchListSpecialty();
        this.fetchAllSpecialty();

    }

    handleOnchange = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHtml: html,
        })
    }


    handleImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let img = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleCreateOrEditSpecialty = async () => {
        let { action, imageBase64 } = this.state;
        if (imageBase64) {
            let resImageClound = await upCloundImageSpecialty({ data: imageBase64 });
            if (resImageClound) {
                if (action === CRUD_ACTION.CREATE) {
                    let data = {
                        name_specialty: this.state.name_specialty,
                        imageBase64: resImageClound.data.url,
                        descriptionHtml: this.state.descriptionHtml,
                        descriptionMarkdown: this.state.descriptionMarkdown,
                        idimage: resImageClound.data.asset_id
                    }
                    let response = await handleCreatespecialty(data);
                    if (response && response.errCode === 0) {
                        this.fetchAllSpecialty();
                    }
                    if (response && response.errCode === 0) {
                        toast.success("Create specialty success!");
                        this.setState({
                            name_specialty: '',
                            imageBase64: '',
                            descriptionHtml: '',
                            descriptionMarkdown: '',
                            idimage: '',
                            action: CRUD_ACTION.CREATE
                        })
                    }
                    else {
                        toast.error("Create specialty error");
                    }
                }
                else {
                    let data = {
                        id: this.state.id,
                        name_specialty: this.state.name_specialty,
                        imageBase64: resImageClound.data.url,
                        descriptionHtml: this.state.descriptionHtml,
                        descriptionMarkdown: this.state.descriptionMarkdown,
                        idimage: resImageClound.data.asset_id
                    }
                    let response = await editSpecialty(data);
                    if (response && response.errCode === 0) {
                        this.fetchAllSpecialty();
                    }
                    if (response && response.errCode === 0) {
                        toast.success("Edit specialty success!");
                        this.setState({
                            name_specialty: '',
                            imageBase64: '',
                            descriptionHtml: '',
                            descriptionMarkdown: '',
                            idimage: '',
                            action: CRUD_ACTION.CREATE
                        })
                    }
                    else {
                        toast.error("Edit specialty error");
                    }
                }
            }
            else {
                toast.error("Error from server!");
            }
        }

    }

    handleSendDataFormSpecialty = (data) => {
        this.setState({
            id: data.id,
            name_specialty: data.namespecialty,
            imageBase64: data.image,
            descriptionHtml: data.descriptionHtml,
            descriptionMarkdown: data.descriptionMarkdown,
            action: CRUD_ACTION.EDIT
        })
    }


    handleDeleteSpecialty = async (id) => {
        let res = await deleteSpecialty(id);
        if (res) {
            this.fetchAllSpecialty();
            toast.success("Delete specialty success!");
        }
        else {
            toast.error("Delete specialty error!");
        }
    }


    handleCancel = () => {
        this.setState({
            id: '',
            name_specialty: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionMarkdown: '',
            action: CRUD_ACTION.CREATE
        })
    }

    openReviewImage = () => {
        if (!this.state.imageBase64) return;
        this.setState({
            isOpenImage: true
        })
    }
    render() {
        let { listSpecialtys } = this.state;
        return (
            <>
                <div className='manage-specialty container'>
                    <p className='title'>Quản lý chuyên khoa</p>
                    <div className='add_new-specialty row'>
                        <div className='col-6 form-group'>
                            <label className='name'>Tên chuyên khoa</label>
                            <input type="text" className="form-control" placeholder="Tên chuyên khoa" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { this.handleOnchange(event, 'name_specialty') }} value={this.state.name_specialty} />
                        </div>
                        <div className='col-6 form-group'>
                            <label className='name'>Upload ảnh</label>
                            <input type="file" className="form-control-file" onChange={(event) => { this.handleImage(event) }} placeholder="Upload ảnh" aria-label="Username" aria-describedby="basic-addon1" />
                            <div className='preview_image' onClick={() => { this.openReviewImage() }} >
                                {this.state.imageBase64 ?
                                    <img src={this.state.imageBase64} />
                                    :
                                    ''}
                            </div>
                        </div>
                        <div className='col-12'>
                            <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.descriptionMarkdown} />
                        </div>
                        <div className='col-12 button_create'>
                            <button type="button" className="btn btn-info ml-2" onClick={() => this.handleCreateOrEditSpecialty()}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.handleCancel()}>Cancel</button>
                        </div>
                    </div>
                    <table className="table table_specialty">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">name</th>
                                <th scope="col">image</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listSpecialtys && listSpecialtys.length > 0 && listSpecialtys.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.namespecialty}</td>
                                        <td className='image' style={{ backgroundImage: `url(${item.image})` }}>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.handleSendDataFormSpecialty(item)} className="btn btn-warning " style={{ marginRight: 5 }}><i className="fas fa-edit" ></i></button>
                                            <button type="button" onClick={() => this.handleDeleteSpecialty(item.id)} className="btn btn-danger" ><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
                {
                    this.state.isOpenImage == true &&
                    <Lightbox
                        mainSrc={this.state.imageBase64}
                        onCloseRequest={() => this.setState({ isOpenImage: false })}
                    />
                }
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
        fetchListSpecialty: () => dispatch(actions.getDoctorRequireInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
