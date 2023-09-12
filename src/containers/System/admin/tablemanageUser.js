import React, { Component } from 'react';
import { connect } from 'react-redux';
import './tablemanageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class TableUserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUserArr: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { listUser } = this.props;
        if (prevProps.listUser !== listUser) {
            this.setState({
                listUserArr: listUser
            })
        }
    }
    componentDidMount() {
        this.props.fetUserAll();
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    }

    handleEditUser = (user) => {
        this.props.handleSendUser(user);
    }

    render() {
        let arrUsers = this.props.listUser;
        return (
            <>
                <table className=" table container mt-5">
                    <thead className='thead-dark'>
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
                                <td>{user.gender}</td>
                                <td>{user.roleid}</td>
                                <td>
                                    <button type="button" className="btn btn-warning " onClick={() => this.handleEditUser(user)} style={{ marginRight: 5 }}><i className="fas fa-edit"></i></button>
                                    <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteUser(user.id)}><i className="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetUserAll: () => dispatch(actions.fetchAllUser()),
        deleteUser: (id) => dispatch(actions.deleteOneUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage);
