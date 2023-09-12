import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './doctormanage.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { getDetaiInforDoctor } from '../../../services/userservice';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            arrDoctor: [],

            //save i table markdowns
            contentMarkdown: '',
            contetHtml: '',
            selectOption: '',
            description: '',

            //save in table doctorinfor
            arrPrice: [],
            arrPayment: [],
            arrProvice: [],
            arrSpecialty: [],
            arrClinic: [],
            selectPrice: '',
            selectPayment: '',
            selectProvice: '',
            selectClinicId: '',
            selectSpecialtyId: '',
            selectClinic: '',
            nameClinic: '',
            nameAddress: '',
            note: '',
            clinicid: '',
            specialtyid: '',

            language: '',
            hasData: false
        }
    }

    componentDidMount() {
        this.props.fetchUserAllDoctor();
        this.props.fetchDoctorRequireInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allDoctor, language, arrRequireDoctorInfors } = this.props;
        let dataSelect = this.buildDataSelect(allDoctor, 'USER');
        let dataSelectPrice = this.buildDataSelect(arrRequireDoctorInfors.resPrice, 'PRICE');
        let dataSelectPayment = this.buildDataSelect(arrRequireDoctorInfors.resPayment, 'PAYMENT');
        let dataSelectProvice = this.buildDataSelect(arrRequireDoctorInfors.resProvice, 'PROVICE');
        let dataSelectSpecialty = this.buildDataSelect(arrRequireDoctorInfors.resSpecialty, 'SPECIALTY');
        let dataSelectClinic = this.buildDataSelect(arrRequireDoctorInfors.resClinic, 'CLINIC')
        if (prevProps.allDoctor !== allDoctor) {
            this.setState({
                arrDoctor: dataSelect
            })
        }

        if (prevProps.arrRequireDoctorInfors !== arrRequireDoctorInfors) {
            this.setState({
                arrPrice: dataSelectPrice,
                arrPayment: dataSelectPayment,
                arrProvice: dataSelectProvice,
                arrSpecialty: dataSelectSpecialty,
                arrClinic: dataSelectClinic
            })
        }
        if (prevProps.language !== language) {
            this.setState({
                arrDoctor: dataSelect,
                arrPrice: dataSelectPrice,
                arrPayment: dataSelectPayment,
                arrProvice: dataSelectProvice
            })
        }
    }


    buildDataSelect = (data, type) => {
        let result = [];
        let { language } = this.props;

        if (data) {
            if (type === 'USER') {
                data.map((item, index) => {
                    let object = {};
                    let lableEn = `${item.lastName} ${item.firstName}`;
                    let lableVi = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            else if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    let lableVi = `${item.valueVi} VND`;
                    let lableEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            else if (type === 'PAYMENT' || type === 'PROVICE') {
                data.map((item, index) => {
                    let object = {};
                    let lableEn = `${item.valueEn}`;
                    let lableVi = `${item.valueVi}`;
                    object.label = language === LANGUAGES.VI ? lableVi : lableEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            else if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {};
                    object.label = item.namespecialty;
                    object.value = item.id;
                    result.push(object);
                })
            }
            else if (type === 'CLINIC') {
                data.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    handleSaveMarkdown = () => {
        let { hasData } = this.state;

        this.props.createInforDoctor({
            //save i table markdowns
            contentHTML: this.state.contetHtml,
            contentMarkdown: this.state.contentMarkdown,
            descriptions: this.state.description,
            doctorid: this.state.selectOption.value,
            action: hasData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            //save in table doctorinfor
            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvice: this.state.selectProvice.value,

            selectSpecialtyId: this.state.selectSpecialtyId.value,
            selectClinicId: this.state.selectClinicId.value,

            nameClinic: this.state.nameClinic,
            nameAddress: this.state.nameAddress,
            note: this.state.note
        })

    }

    handleChangeOption = async (chooseSelectOption) => {
        this.setState({
            selectOption: chooseSelectOption
        });
        let res = await getDetaiInforDoctor(chooseSelectOption.value);
        let { arrPrice, arrPayment, arrProvice, arrSpecialty, arrClinic } = this.state;

        if (res && res.errCode === 0 && res.data && res.data.markdown) {
            let markdownData = res.data.markdown;
            if (res.data.markdown.contentHTML === null || res.data.markdown.contentMarkdown === null) {
                this.setState({
                    contetHtml: '',
                    contentMarkdown: '',
                    description: '',
                    hasData: false,
                })
            }
            else {
                let addressclinic = '', nameclinic = '', note = '', paymentid = '', priceid = '', proviceid = '', selectSpecialtyId = '', selectClinicId = '', findselectSpecialtyId = '', findItemPrice = '', findItemPayment = '', findItemprovice = '', findItemClinicId;

                if (res.data.doctorinfor) {
                    addressclinic = res.data.doctorinfor.addressclinic;
                    nameclinic = res.data.doctorinfor.nameclinic;
                    note = res.data.doctorinfor.note;
                    paymentid = res.data.doctorinfor.paymentid;
                    priceid = res.data.doctorinfor.priceid;
                    proviceid = res.data.doctorinfor.proviceid;
                    selectSpecialtyId = res.data.doctorinfor.specialtyid;
                    selectClinicId = res.data.doctorinfor.clinicid

                    if (paymentid !== null || priceid !== null || proviceid !== null || selectSpecialtyId !== null) {
                        findItemPayment = arrPayment.find(item => {
                            return item && item.value === paymentid
                        });
                        findItemPrice = arrPrice.find(item => {
                            return item && item.value === priceid
                        });
                        findItemprovice = arrProvice.find(item => {
                            return item && item.value === proviceid
                        });
                        findselectSpecialtyId = arrSpecialty.find(item => {
                            return item && item.value === selectSpecialtyId
                        });
                        findItemClinicId = arrClinic.find(item => {
                            return item && item.value === selectClinicId
                        })
                    }
                    if (nameclinic === null || addressclinic === null || note === null) {
                        nameclinic = '';
                        addressclinic = '';
                        note = '';
                    }
                }
                this.setState({
                    contetHtml: markdownData.contentHTML,
                    contentMarkdown: markdownData.contentMarkdown,
                    description: markdownData.descriptions,
                    selectPrice: findItemPrice,
                    selectPayment: findItemPayment,
                    selectProvice: findItemprovice,
                    nameClinic: nameclinic,
                    nameAddress: addressclinic,
                    note: note,
                    selectClinicId: findItemClinicId,
                    selectSpecialtyId: findselectSpecialtyId,
                    hasData: true
                })
            }
        }

        else if (res.data.markdown.contentHTML === null || res.data.markdown.contentMarkdown === null) {
            this.setState({
                contetHtml: '',
                contentMarkdown: '',
                selectPrice: '',
                selectPayment: '',
                description: '',
                selectProvice: '',
                nameClinic: '',
                nameAddress: '',
                hasData: false
            })
        }
    }

    handleChangeDoctorRequireInfor = (selectDoctorInfor, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id.name] = selectDoctorInfor;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contetHtml: html,
        })
    }

    render() {
        let { hasData, arrPrice, arrPayment, arrProvice, arrSpecialty, arrClinic } = this.state;
        return (
            <>
                <div className='manage_doctor-container'>
                    <p className='manage_doctor-title'><FormattedMessage id="admin_doctor.manage_doctor" /></p>
                    <div className='container'>
                        <div className='mor-infor'>
                            <div className='choose_doctor'>
                                <label><FormattedMessage id="admin_doctor.choose_doctor" /></label>
                                <Select
                                    placeholder={<FormattedMessage id="admin_doctor.choose_doctor" />}
                                    value={this.state.selectOption}
                                    onChange={this.handleChangeOption}
                                    options={this.state.arrDoctor}
                                />
                            </div>
                            <div className='description'>
                                <label><FormattedMessage id="admin_doctor.add_infor_description_doctor" /></label>
                                <textarea className="form-control" value={this.state.description} rows="4" onChange={(event) => { this.handleOnchangText(event, 'description') }} >
                                </textarea>
                            </div>
                        </div>
                        <div className='infor_extra'>
                            <div className='row'>

                                <div className=" mb-3 col-lg-6">
                                    <div className="">
                                        <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.price" /></span>
                                    </div>
                                    <Select
                                        placeholder={<FormattedMessage id="admin_doctor.price" />}
                                        value={this.state.selectPrice}
                                        onChange={this.handleChangeDoctorRequireInfor}
                                        options={arrPrice}
                                        name='selectPrice'
                                    />
                                </div>
                                <div className=" mb-3 col-lg-6">
                                    <div className="">
                                        <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.payment" /></span>
                                    </div>
                                    <Select
                                        placeholder={<FormattedMessage id="admin_doctor.payment" />}
                                        value={this.state.selectPayment}
                                        onChange={this.handleChangeDoctorRequireInfor}
                                        options={arrPayment}
                                        name='selectPayment'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className=" mb-3 col-lg-6">
                                    <div className="">
                                        <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.choose_province" /></span>
                                    </div>
                                    <Select
                                        placeholder={<FormattedMessage id="admin_doctor.choose_province" />}
                                        value={this.state.selectProvice}
                                        onChange={this.handleChangeDoctorRequireInfor}
                                        options={arrProvice}
                                        name='selectProvice'
                                    />
                                </div>
                                <div className=" mb-3 col-lg-6">
                                    <div className="">
                                        <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.choose_specialty" /></span>
                                    </div>
                                    <Select
                                        placeholder={<FormattedMessage id="admin_doctor.choose_specialty" />}
                                        value={this.state.selectSpecialtyId}
                                        onChange={this.handleChangeDoctorRequireInfor}
                                        options={arrSpecialty}
                                        name='selectSpecialtyId'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className=" mb-3 col-lg-6">
                                    <div className="">
                                        <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.choose_clinic" /></span>
                                    </div>
                                    <Select
                                        placeholder={<FormattedMessage id="admin_doctor.choose_clinic" />}
                                        value={this.state.selectClinicId}
                                        onChange={this.handleChangeDoctorRequireInfor}
                                        options={arrClinic}
                                        name='selectClinicId'
                                    />
                                </div>
                                <div className=" mb-3 col-lg-6">
                                    <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.clinic_name" /></span>
                                    <input type="text" onChange={(event) => { this.handleOnchangText(event, 'nameClinic') }} value={this.state.nameClinic} className="form-control" placeholder="Tên phòng khám" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className=" mb-3 col-lg-6">
                                    <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.clinic_address" /></span>
                                    <input type="text" onChange={(event) => { this.handleOnchangText(event, 'nameAddress') }} value={this.state.nameAddress} className="form-control" placeholder="Địa chỉ phòng khám" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className=" mb-3 col-lg-6">
                                    <span className="-text" id="basic-addon1"><FormattedMessage id="admin_doctor.note" /></span>
                                    <input type="text" onChange={(event) => { this.handleOnchangText(event, 'note') }} value={this.state.note} className="form-control" placeholder="Ghi chú" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} value={this.state.contentMarkdown} />

                        {hasData == false ? <button type="button" className="btn btn-primary mt-3" onClick={() => { this.handleSaveMarkdown() }}>Save</button> : <button type="button" className="btn btn-warning mt-3" onClick={() => { this.handleSaveMarkdown() }}>Edit</button>}
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctors,
        arrRequireDoctorInfors: state.admin.arrRequireDoctorInfor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserAllDoctor: () => dispatch(actions.fetchAllDoctors()),
        fetchDoctorRequireInfor: () => dispatch(actions.getDoctorRequireInfor()),
        createInforDoctor: (data) => dispatch(actions.fetchCreateDoctorInfor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
