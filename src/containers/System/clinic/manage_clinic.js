import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES, CommonUtils, CRUD_ACTION } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import "./manage_clinic.scss";
import * as actions from '../../../store/actions';
import { createClinic, getAllClinic, upCloundImageClinic, editClinic } from '../../../services/clinicService';

import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_clinic: '',
            address: '',
            description: '',
            imageBase64: '',
            descriptionHtml: '',
            descriptionHtmlShort: '',
            descriptionMarkdown: '',
            actions: CRUD_ACTION.CREATE,
            imageClound: '',
            idimageClound: '',
            listClinic: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        this.fetchAllClinic();
    }

    fetchAllClinic = async () => {
        let res = await getAllClinic();
        if (res) {
            this.setState({
                listClinic: res.data
            })
        }
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
    handleEditorChangeShort = ({ html, text }) => {
        this.setState({
            description: text,
            descriptionHtmlShort: html,
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

    handleCreateOrEditClinic = async () => {

        let { id, imageBase64, name_clinic, address, description, descriptionHtml, descriptionHtmlShort, descriptionMarkdown, actions, imageClound, idimageClound } = this.state;
        if (imageBase64) {
            let resImageClound = await upCloundImageClinic({ data: imageBase64 });
            if (resImageClound) {
                if (actions === CRUD_ACTION.CREATE) {
                    let data = {
                        name_clinic: name_clinic,
                        address: address,
                        description: description,
                        descriptionHtmlShort: descriptionHtmlShort,
                        descriptionHtml: descriptionHtml,
                        descriptionMarkdown: descriptionMarkdown,
                        imageClound: resImageClound.data.url,
                        idimageClound: resImageClound.data.asset_id
                    }
                    let response = await createClinic(data);
                    if (response && response.errCode === 0) {
                        toast.success("Create specialty success!");
                        this.fetchAllClinic();
                        this.setState({
                            name_clinic: '',
                            address: '',
                            description: '',
                            descriptionHtmlShort: '',
                            imageBase64: '',
                            descriptionHtml: '',
                            descriptionMarkdown: '',
                            action: CRUD_ACTION.CREATE
                        })
                    }
                    else {
                        toast.error("Create specialty error");
                    }
                }
                else {
                    let data = {
                        id: id,
                        name_clinic: name_clinic,
                        address: address,
                        description: description,
                        descriptionHtmlShort: descriptionHtmlShort,
                        descriptionHtml: descriptionHtml,
                        descriptionMarkdown: descriptionMarkdown,
                        imageClound: resImageClound.data.url,
                        idimageClound: resImageClound.data.asset_id
                    }
                    let response = await editClinic(data);
                    if (response && response.errCode === 0) {
                        toast.success("Edit specialty success!");
                        this.fetchAllClinic();
                        this.setState({
                            name_clinic: '',
                            address: '',
                            description: '',
                            descriptionHtmlShort: '',
                            imageBase64: '',
                            descriptionHtml: '',
                            descriptionMarkdown: '',
                            action: CRUD_ACTION.CREATE
                        })
                    }
                    else {
                        toast.error("Edit specialty error");
                    }
                }
            }
        }

    }

    handleSendDataFormClinic = (data) => {
        this.setState({
            id: data.id,
            name_clinic: data.name,
            address: data.address,
            description: data.description,
            descriptionHtmlShort: data.descriptionHtmlShort,
            descriptionHtml: data.descriptionHtml,
            descriptionMarkdown: data.descriptionMarkdown,
            imageBase64: data.image,
            actions: CRUD_ACTION.EDIT
        })
    }

    handleCancelClinic = () => {
        this.setState({
            name_clinic: '',
            address: '',
            description: '',
            descriptionHtmlShort: '',
            descriptionHtml: '',
            descriptionMarkdown: '',
            imageBase64: '',
            actions: CRUD_ACTION.CREATE
        })
    }

    render() {
        let { listClinic } = this.state;
        return (
            <>
                <div className='manage-specialty container'>
                    <p className='title'>Quản lý phòng khám</p>
                    <div className='add_new-specialty row'>
                        <div className='col-6 form-group'>
                            <label className='name'>Tên phòng khám</label>
                            <input type="text" className="form-control" placeholder="Tên phòng khám" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { this.handleOnchange(event, 'name_clinic') }} value={this.state.name_clinic} />
                        </div>
                        <div className='col-6 form-group'>
                            <label className='name'>Địa chỉ phòng khám</label>
                            <input type="text" className="form-control" placeholder="Địa chỉ phòng khám" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { this.handleOnchange(event, 'address') }} value={this.state.address} />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='name'>Mô tả</label>
                            <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeShort} value={this.state.description} />
                        </div>
                        <div className='col-6 form-group'>
                            <label className='name'>Upload ảnh</label>
                            <input type="file" className="form-control-file" onChange={(event) => { this.handleImage(event) }} placeholder="Upload ảnh" aria-label="Username" aria-describedby="basic-addon1" />
                            <div className='preview_image'>
                                {this.state.imageBase64 ?
                                    <img src={this.state.imageBase64} />
                                    :
                                    ''}
                            </div>
                        </div>
                        <div className='col-12'>
                            <label className='name'>Mô tả chi tiết</label>
                            <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.descriptionMarkdown} />
                        </div>
                        <div className='col-12 button_create'>
                            <button type="button" className="btn btn-info" onClick={() => this.handleCreateOrEditClinic()}>Save</button>
                            <button type="button" className="btn btn-danger mr-3" onClick={() => this.handleCancelClinic()}>Cancel</button>
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
                            {listClinic && listClinic.length > 0 && listClinic.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td className='image' >
                                            <img src={item.image} />
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.handleSendDataFormClinic(item)} className="btn btn-warning " style={{ marginRight: 5 }}><i className="fas fa-edit" ></i></button>
                                            <button type="button" onClick={() => this.handleDeleteClinic(item.id)} className="btn btn-danger" ><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
