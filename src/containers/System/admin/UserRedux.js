import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { getAllCodes } from '../../../services/userservice';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './userRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import TableUserManage from './tablemanageUser';
import { FormattedMessage } from "react-intl";
import { upLoadCloundImageUser } from '../../../services/userservice';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            // img: '',
            isOpenImage: false,

            id: null,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            roleid: '',
            positionid: '',
            image: '',
            imageCloud: '',
            imageCloudId: '',
            action: CRUD_ACTION.CREATE
        }
    }


    async componentDidMount() {
        this.props.getGendersStart();
        this.props.getPositionsStart();
        this.props.getRolesStart();
        // try {
        //     let response = await getAllCodes('GENDER');
        //     if (response && response.errCode === 0) {
        //         this.setState({
        //             genderArr: response.data
        //         })
        //     }
        // } catch (error) {
        //     throw error;
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // ba bien nay la cua redux ko  lien quan de state cuar component
        const { genders, positions, roles } = this.props;
        if (
            prevProps.genders !== genders ||
            prevProps.positions !== positions ||
            prevProps.roles !== roles
        ) {
            this.setState({
                genderArr: genders,
                positionArr: positions,
                roleArr: roles

            });
        }
        //dung de check khi da ta moi user thi goi listUser tu redux de kiem tra xem listUser co thay doi gia tri, neu co thi cap nhat state 
        if (prevProps.listUser !== this.props.listUser) {
            let arrGender = this.props.genders;
            let arrPositions = this.props.positions;
            let arrRole = this.props.roles;

            this.setState({
                id: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                //dùng để set giá trị mặc định cho 3 select
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                roleid: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                positionid: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                image: '',
                action: CRUD_ACTION.CREATE,
                img: ''
            })
        }
    }



    handleImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let img = URL.createObjectURL(file);
            this.setState({
                // img: img,
                image: base64
            })
        }
    }



    openReviewImage = () => {
        if (!this.state.image) return;
        this.setState({
            isOpenImage: true
        })
    }

    onChangInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }


    handleAddUserOrEditUser = async () => {
        let { action } = this.state;
        let { id, email, password, firstName, lastName, phonenumber, address, gender, roleid, positionid, image, imageCloud,
            imageCloudId } = this.state;

        let dataImageUpCloud = await upLoadCloundImageUser({ data: image });
        if (dataImageUpCloud) {
            if (action === CRUD_ACTION.CREATE) {
                let isValid = this.checkValidateInput();
                if (isValid === false) {
                    return;
                }
                else if (isValid == true) {
                    // 3 biến gender, roleid, positionid đã set giá trị mặc định và đã cố gắng đặt giống row của api, khi set gia trị mặt định của 3 biến này ở hàm componentDidUpdate() 

                    this.props.createUser({
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phonenumber: phonenumber,
                        address: address,
                        gender: gender,
                        roleid: roleid,
                        positionid: positionid,
                        image: dataImageUpCloud.data.url,
                        idimage: dataImageUpCloud.data.asset_id
                    });
                };
            }
            else {
                let { id, firstName, lastName, phonenumber, address, gender, roleid, positionid, image } = this.state;
                this.props.editUser({
                    id: id,
                    // email: email,
                    // password: password,
                    firstName: firstName,
                    lastName: lastName,
                    phonenumber: phonenumber,
                    address: address,
                    gender: gender,
                    roleid: roleid,
                    positionid: positionid,
                    image: dataImageUpCloud.data.url,
                    idimage: dataImageUpCloud.data.asset_id
                });
            }
        }

    }



    handleCancel = () => {
        let arrGender = this.props.genders;
        let arrPositions = this.props.positions;
        let arrRole = this.props.roles;
        this.setState({
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            //dùng để set giá trị mặc định cho 3 select
            gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
            roleid: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            positionid: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            image: '',
            action: CRUD_ACTION.CREATE,
            img: ''
        })
    }

    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error(`You must enter ${arrCheck[i]}`);
                break
            }
        }
        return isValid;
    }

    handleSendUserEdit = (sendUser) => {
        this.setState({
            id: sendUser.id,
            // email: sendUser.email,
            // password: "adc",
            firstName: sendUser.firstName,
            lastName: sendUser.lastName,
            phonenumber: sendUser.phonenumber,
            address: sendUser.address,
            gender: sendUser.gender,
            roleid: sendUser.roleid,
            positionid: sendUser.positionid,
            image: sendUser.image,
            action: CRUD_ACTION.EDIT
        })
    }

    render() {
        let listGender = this.state.genderArr;
        let language = this.props.language;
        let listPosition = this.state.positionArr;
        let listRole = this.state.roleArr;
        let loadingData = this.props.isLoadingData;
        let { email, password, firstName, lastName, phonenumber, address, gender, roleid, positionid, image } = this.state;
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    Add new user
                </div>
                {loadingData === true ? 'Loading Data' :
                    <>
                        <div className='user-redux-body'>
                            <div className='container'>
                                <form>
                                    <div className="form-row row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} type="text" className="form-control" placeholder="Email" value={email} onChange={(event) => this.onChangInput(event, 'email')} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input disabled={this.state.action === CRUD_ACTION.EDIT ? true : false} type="password" className="form-control" placeholder="Password" value={password} onChange={(event) => this.onChangInput(event, 'password')} />
                                        </div>
                                    </div>
                                    <div className="form-row row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">First name</label>
                                            <input type="text" className="form-control" placeholder="First name" value={firstName} onChange={(event) => this.onChangInput(event, 'firstName')} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Last name</label>
                                            <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={(event) => this.onChangInput(event, 'lastName')} />
                                        </div>
                                    </div>
                                    <div className="form-row row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Phone number</label>
                                            <input type="text" className="form-control" placeholder="Phone number" value={phonenumber} onChange={(event) => this.onChangInput(event, 'phonenumber')} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Address</label>
                                            <input type="text" className="form-control" placeholder="Address" value={address} onChange={(event) => this.onChangInput(event, 'address')} />
                                        </div>
                                    </div>
                                    <div className="form-row row">
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputState">Gender</label>
                                            <select
                                                id="inputState"
                                                className="form-control"
                                                // Set the value prop to the desired default value
                                                onChange={(event) => this.onChangInput(event, 'gender')} value={gender}
                                            >
                                                {listGender &&
                                                    listGender.length > 0 &&
                                                    listGender.map((item, index) => {
                                                        return (
                                                            <option value={item.keyMap} key={index}>
                                                                {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>

                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputPassword4">Role</label>
                                            <select id="inputState" className="form-control"
                                                onChange={(event) => this.onChangInput(event, 'roleid')} value={roleid}
                                            >
                                                {listRole && listRole.length > 0 &&
                                                    listRole.map((item, index) => {
                                                        return (
                                                            <option value={item.keyMap} key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputState">Position</label>
                                            <select id="inputState" className="form-control"
                                                onChange={(event) => this.onChangInput(event, 'positionid')} value={positionid}
                                            >
                                                {listPosition && listPosition.length > 0 &&
                                                    listPosition.map((item, index) => {
                                                        return (
                                                            <option value={item.keyMap} key={index}>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="inputZip">Image</label>
                                            <input type="file" className="form-control" onChange={(event) => { this.handleImage(event) }} id="inputZip" />
                                            <div className='preview_image' onClick={() => { this.openReviewImage() }}>
                                                {this.state.image ?
                                                    <img src={this.state.image} />
                                                    :
                                                ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <button type="button" className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"} onClick={() => this.handleAddUserOrEditUser()}>
                                            {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage_user.edit" /> : <FormattedMessage id="manage_user.add" />}
                                        </button>&emsp;
                                        <button type="button" onClick={() => this.handleCancel()} className="btn btn-danger">Cancel</button>
                                    </div>
                                </form>

                            </div>
                        </div>

                        <TableUserManage
                            handleSendUser={this.handleSendUserEdit}
                            sendAction={this.state.action}
                        />
                    </>
                }

                {
                    this.state.isOpenImage == true &&
                    <Lightbox
                        mainSrc={this.state.image}
                        onCloseRequest={() => this.setState({ isOpenImage: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        loadingData: state.admin.isLoadingData,
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersStart: () => dispatch(actions.fetchGenderStart()),
        getPositionsStart: () => dispatch(actions.fetchPositionStart()),
        getRolesStart: () => dispatch(actions.fetchRoleStart()),
        createUser: (data) => dispatch(actions.createNewUser(data)),
        fetUserAll: () => dispatch(actions.fetchAllUser()),
        editUser: (data) => dispatch(actions.editOneUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
