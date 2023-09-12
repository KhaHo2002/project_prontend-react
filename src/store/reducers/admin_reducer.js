import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingData: false,
    users: [],
    doctors: [],
    allDoctors: [],
    allCodeTime: [],
    arrRequireDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingData = true
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingData = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingData = false;
            state.genders = [];
            return {
                ...state,
            }
        //get position
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingData = true
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoadingData = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.isLoadingData = false;
            state.positions = [];
            return {
                ...state,
            }

        //Role
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingData = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            state.isLoadingData = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.isLoadingData = false;
            state.roles = [];
            return {
                ...state,
            }

        //get all user
        case actionTypes.FETCT_ALL_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCT_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            }
        //get all top doctor
        case actionTypes.FETCT_ALL_TOP_DOCTOR_SUCCESS:
            state.doctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCT_ALL_TOP_DOCTOR_FAIL:
            state.doctors = [];
            return {
                ...state,
            }


        //get all  doctor
        case actionTypes.FETCT_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCT_ALL_DOCTOR_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            }
        //get all  code
        case actionTypes.FETCT_GET_ALLCODES_TIME_SUCCESS:
            state.allCodeTime = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCT_GET_ALLCODES_TIME_FAIL:
            state.allCodeTime = [];
            return {
                ...state,
            }
        //get all require infor
        case actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_SUCCESS:
            state.arrRequireDoctorInfor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_FAIL:
            state.arrRequireDoctorInfor = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;