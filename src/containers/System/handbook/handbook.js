import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { createHandbook, upCloundImageHandbook } from '../../../services/handBookService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class HandbookManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_handbook: '',
            image: '',
            contentHTML: '',
            contentMarkdown: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            imageCloud: '',
            idImageCloud: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {

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
            descriptionMarkdown: text,
            descriptionHTML: html,
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
        let { name_handbook, image, contentHTML, contentMarkdown, descriptionHTML, descriptionMarkdown, imageCloud, idImageCloud } = this.state
        let responseImageCloud = await upCloundImageHandbook({ data: image });
        if (responseImageCloud) {
            let data = {
                name_handbook: name_handbook,
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                descriptionhtml: descriptionHTML,
                descriptionmarkdown: descriptionMarkdown,
                imageCloud: responseImageCloud.data.url,
                idImageCloud: responseImageCloud.data.asset_id
            }
            let response = await createHandbook(data);
            if (response && response.errCode === 0) {
                toast.success("Create specialty success!");
                this.setState({
                    name_handbook: '',
                    image: '',
                    contentHTML: '',
                    contentMarkdown: ''
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

    render() {

        return (
            <>
                <div className='manage-specialty container'>
                    <p className='title'>Quản lý cẩm nang</p>
                    <div className='add_new-specialty row'>
                        <div className='col-6 form-group'>
                            <label className='name'>Tên cẩm nang</label>
                            <input type="text" className="form-control" placeholder="Tên chuyên khoa" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => { this.handleOnchange(event, 'name_handbook') }} value={this.state.name_handbook} />
                        </div>
                        <div className='col-12'>
                            <h5>Mô tả ngắn</h5>
                            <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeDesShort} value={this.state.descriptionMarkdown} />
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
