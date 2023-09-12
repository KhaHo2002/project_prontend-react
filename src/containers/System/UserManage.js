import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserOrOnlyUser, createUser, deleteUser, editUser } from '../../services/userservice';
import ModelUser from './model_add_user';
import ModelEdit from './model_edit_user';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            openModelUser: false,
            openModelEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }
    getAllUser = async () => {
        try {
            let response = await getAllUserOrOnlyUser('All');
            if (response && response.errCode === 0) {
                this.setState({
                    arrUsers: response.user
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
    renderUserRole(roleid) {
        if (roleid === '1') {
            return 'Admin';
        }
        else if (roleid === '2') {
            return 'Doctor';
        }
        else if (roleid === '3') {
            return 'Patient';
        }
    }

    renderUsergender(gender) {
        if (gender === 1) {
            return 'Men';
        }
        else if (gender === 0) {
            return 'Women';
        }
    }

    handleAddUser = () => {
        this.setState({
            openModelUser: true
        })
    }

    toggleModelUser = () => {
        this.setState({
            openModelUser: !this.state.openModelUser
        })
    }

    toggleModelEditUser = () => {
        this.setState({
            openModelEditUser: !this.state.openModelEditUser
        })
    }

    createUser = async (data) => {
        try {
            let response = await createUser(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            }
            else {
                this.toggleModelUser();
                await this.getAllUser();
                emitter.emit('clear_modal');
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            await this.getAllUser();
        } catch (error) {
            console.log(error);
        }
    }


    handleOpenModelEdit = (user) => {
        this.setState({
            userEdit: user,
            openModelEditUser: true
        })
    }

    handleEditUser = async (user) => {
        try {
            let res = await editUser(user);
            if (res && res.errCode === 0) {
                this.setState({
                    openModelEditUser: false
                });
                await this.getAllUser();
            }
            else{
                alert(res.errCode)
            }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    render() {
        let { arrUsers } = this.state;
        return (
            <div className="user-container">
                <ModelUser
                    isOpen={this.state.openModelUser}
                    toggleParent={this.toggleModelUser}
                    createNewUser={this.createUser} />

                {/* dung if o day de cho ham componentDidMount ben component edit_user lay duoc du lieu sau khi component edit_user duoc goi*/}
                {this.state.openModelEditUser &&
                    <ModelEdit isOpen={this.state.openModelEditUser}
                        toggleParent={this.toggleModelEditUser}
                        curentUser={this.state.userEdit}
                        editUser={this.handleEditUser}
                    />
                }
                <div className='title text-center'>MANAGE USERS</div>
                <div style={{ margin: '0 0 0 10px' }}>
                    <button onClick={this.handleAddUser} type="button" className="btn btn-primary">Add User<i className="fas fa-plus" style={{ margin: '0 0 0 10px' }}></i></button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.address}</td>
                                <td>{this.renderUsergender(user.gender)}</td>
                                <td>{this.renderUserRole(user.roleid)}</td>
                                <td>
                                    <button type="button" className="btn btn-warning " onClick={() => this.handleOpenModelEdit(user)} style={{ marginRight: 5 }}><i className="fas fa-edit"></i></button>
                                    <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteUser(user.id)}><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        ))}
                        {/* co the render nhu nay */}
                        {/* {arrUsers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{this.renderUsergender(user.gender)}</td>
                                    <td>{this.renderUserRole(user.roleid)}</td>
                                </tr>
                            )
                        })} */}
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
