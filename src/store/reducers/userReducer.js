import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isLoggedIn: false,
    userInfo: null,
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/dashboard',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGNI_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfor
            }
        case actionTypes.USER_LOGNI_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default userReducer;