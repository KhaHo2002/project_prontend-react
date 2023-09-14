import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import { LANGUAGES, CommonUtils, CRUD_ACTION } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { createHandbook, upCloundImageHandbook, getAllHandbook, editHandbook, deleteHandbook } from '../../../services/handBookService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class HandbookManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name_handbook: '',
            image: '',
            idimage: '',
            contentHTML: '',
            contentMarkdown: '',
            descriptionhtml: '',
            descriptionmarkdown: '',
            imageCloud: '',
            idImageCloud: '',
            listHandbook: [],
            action: CRUD_ACTION.CREATE
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async fetchDataHandbook() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                listHandbook: res.data
            })
        }
    }
    async componentDidMount() {
        this.fetchDataHandbook();
    }

    handleOnchange = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChangeDesLong = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleEditorChangeDesShort = ({ html, text }) => {
        this.setState({
            descriptionmarkdown: text,
            descriptionhtml: html,
        })
    }

    handleImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let img = URL.createObjectURL(file);
            this.setState({
                image: base64
            })
        }
    }

    handleSave = async () => {
        let { id, name_handbook, image, contentHTML, contentMarkdown, descriptionhtml, descriptionmarkdown, action, imageCloud } = this.state;


        if (action === CRUD_ACTION.CREATE) {
            let responseImageCloud = await upCloundImageHandbook({ data: image });
            if (responseImageCloud) {
                let data = {
                    name_handbook: name_handbook,
                    contentHTML: contentHTML,
                    contentMarkdown: contentMarkdown,
                    descriptionhtml: descriptionhtml,
                    descriptionmarkdown: descriptionmarkdown,
                    imageCloud: responseImageCloud.data.url,
                    idImageCloud: responseImageCloud.data.asset_id
                }
                let response = await createHandbook(data);
                await getAllHandbook();
                if (response && response.errCode === 0) {
                    toast.success("Create specialty success!");
                    this.fetchDataHandbook();
                    this.setState({
                        name_handbook: '',
                        image: '',
                        contentHTML: '',
                        contentMarkdown: '',
                        action: CRUD_ACTION.CREATE
                    })
                }
                else {
                    toast.error("Create specialty error");
                }
            }
            else {
                toast.error("Create specialty error");
            }
        }
        else if (action === CRUD_ACTION.EDIT) {
            let checkImage = '';
            let checkImageId = '';
            if (image) {
                let responseImageCloud = await upCloundImageHandbook({ data: image });
                let data = {
                    id: id,
                    name_handbook: name_handbook,
                    contentHTML: contentHTML,
                    contentMarkdown: contentMarkdown,
                    descriptionhtml: descriptionhtml,
                    descriptionmarkdown: descriptionmarkdown,
                    imageCloud: responseImageCloud.data.url,
                    idImageCloud: responseImageCloud.data.asset_id
                }
                let response = await editHandbook(data);
                if (response && response.errCode === 0) {
                    toast.success("Edit specialty success!");
                    this.fetchDataHandbook();
                    this.setState({
                        name_handbook: '',
                        image: '',
                        contentHTML: '',
                        contentMarkdown: '',
                        action: CRUD_ACTION.CREATE
                    })
                }
                else {
                    toast.error("Edit specialty error");
                }
            }
            else {
                checkImage = imageCloud
                let data = {
                    id: id,
                    name_handbook: name_handbook,
                    contentHTML: contentHTML,
                    contentMarkdown: contentMarkdown,
                    descriptionhtml: descriptionhtml,
                    descriptionmarkdown: descriptionmarkdown,
                    imageCloud: imageCloud
                }
                let response = await editHandbook(data);
                if (response && response.errCode === 0) {
                    toast.success("Edit specialty success!");
                    this.fetchDataHandbook();
                    this.setState({
                        name_handbook: '',
                        image: '',
                        contentHTML: '',
                        contentMarkdown: '',
                        action: CRUD_ACTION.CREATE
                    })
                }
                else {
                    toast.error("Edit specialty error");
                }
            }
        }


    }

    handleSendDataFormHandbook = (handbook) => {
        this.setState({
            id: handbook.id,
            name_handbook: handbook.name_handbook,
            contentHTML: handbook.contentHTML,
            contentMarkdown: handbook.contentMarkdown,
            descriptionhtml: handbook.descriptionhtml,
            descriptionmarkdown: handbook.descriptionmarkdown,
            imageCloud: handbook.image,
            action: CRUD_ACTION.EDIT
        });
    }

    handleDeleteHandbook = async (id) => {
        let res = await deleteHandbook(id);
        if (res && res.errCode === 0) {
            toast.success("Delete handbook success!");
            this.fetchDataHandbook();
        }
        else {
            toast.error("Delete handbook error!");
        }
    }

    render() {
        let { listHandbook } = this.state;
        return (
            <>
                <div className='container'>
                    <div className='manage-specialty container'>
                        <p className='title'>Quản lý cẩm nang</p>
                        <div className='add_new-specialty row'>
                            <div className='col-6 form-group'>
                                <label className='name'>Tên cẩm nang</label>
                                <input type="text" className="form-control" placeholder="Tên chuyên khoa" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { this.handleOnchange(event, 'name_handbook') }} value={this.state.name_handbook} />
                            </div>
                            <div className='col-12'>
                                <h5>Mô tả ngắn</h5>
                                <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeDesShort} value={this.state.descriptionmarkdown} />
                            </div>
                            <div className='col-6 form-group'>
                                <label className='name'>Upload ảnh</label>
                                <input type="file" className="form-control-file" onChange={(event) => { this.handleImage(event) }} placeholder="Upload ảnh" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div className='col-12'>
                                <h5>Mô tả dài</h5>
                                <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeDesLong} value={this.state.contentMarkdown} />
                            </div>
                            <div className='col-12 button_create'>
                                <button type="button" className="btn btn-info" onClick={() => this.handleSave()}>Save</button>
                            </div>
                        </div>

                    </div >
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
                            {listHandbook && listHandbook.length > 0 && listHandbook.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name_handbook}</td>
                                        <td className='image' style={{ backgroundImage: `url(${item.image})` }}>
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => this.handleSendDataFormHandbook(item)} className="btn btn-warning " style={{ marginRight: 5 }}><i className="fas fa-edit" ></i></button>
                                            <button type="button" onClick={() => this.handleDeleteHandbook(item.id)} className="btn btn-danger" ><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandbookManage);
