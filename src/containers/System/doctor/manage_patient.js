import React, { Component } from 'react';
import { connect } from "react-redux";
import './manage_patient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatient } from '../../../services/patientService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './remedy_modal';
import { sendRemedyPatient } from '../../../services/patientService';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            patientData: [],
            isOpen: false,
            dataModelRemedy: {},
            iShowloading: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {

        this.getPatientData();

    }

    getPatientData = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let fotmatDate = new Date(currentDate).getTime();
        let res = await getAllPatient(user.id, fotmatDate);
        if (res && res.errCode === 0) {
            this.setState({
                patientData: res.data
            })
        }
    }

    handleOnchangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getPatientData();
        })
    }

    handleVerify = (item) => {
        let data = {
            doctorid: item.doctorid,
            patientid: item.patienid,
            email: item.dataPatient.email,
            timeType: item.time_type,
            namePatient: item.dataPatient.firstName
        }
        this.setState({
            isOpen: true,
            dataModelRemedy: data
        })
    }

    toggleModelRemedy = () => {
        this.setState({
            isOpen: !this.state.isOpen,

        })
    }

    sendRemedy = async (dataRemedy) => {
        let { dataModelRemedy } = this.state;
        this.setState({
            iShowloading:true
        })
        let res = await sendRemedyPatient({
            email: dataRemedy.email,
            file: dataRemedy.fileData,
            doctorid: dataModelRemedy.doctorid,
            patientid: dataModelRemedy.patientid,
            timeType: dataModelRemedy.timeType,
            language: this.props.language,
            namePatient: dataModelRemedy.namePatient
        });
        if (res && res.errCode === 0) {
            this.setState({
                iShowloading:false
            })
            toast.success("Send patient success");
            await this.getPatientData();
            this.toggleModelRemedy();
        }
        else {
            this.setState({
                iShowloading:false
            })
            toast.error("Send patient error");
        }

    }

    render() {
        let { language } = this.props;
        let { patientData, isOpen, dataModelRemedy } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <LoadingOverlay
                    active={this.state.iShowloading}
                    spinner
                    text='Loading...'
                >
                    < div className='manage_patient container'>
                        <div className='title'>Quản lý bệnh nhân khám bệnh</div>
                        <div className='list_data-patient row'>
                            <div className=" mb-3 col-6">
                                <p className=''>Chọn ngày khám</p>
                                <DatePicker onChange={(event) => this.handleOnchangDatePicker(event)} minDate={yesterday} value={this.state.currentDate} className='form-control' />
                            </div>

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Họ và tên bệnh nhân</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientData && patientData.length > 0 ?
                                    patientData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td>{item.dataPatient.firstName}</td>
                                                <td>{language === LANGUAGES.VI ? item.dataPatient.genderData.valueVi : item.dataPatient.genderData.valueEn}</td>
                                                <td>{item.dataPatient.address}</td>
                                                <td>{language === LANGUAGES.VI ? item.timeDetail.valueVi : item.timeDetail.valueEn}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary" onClick={() => this.handleVerify(item)}>Xác nhận</button>
                                                    {/* <button type="button" className="btn btn-warning">Gửi hóa đơn</button> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <td></td>
                                }
                            </tbody>
                        </table>
                    </div>
                    <RemedyModal sendDataRemedy={this.sendRemedy} isOpenModal={isOpen} dataPatient={dataModelRemedy} toggleParent={this.toggleModelRemedy} />
                </LoadingOverlay>

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
