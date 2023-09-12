const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGNI_SUCCESS: 'USER_LOGNI_SUCCESS',
    USER_LOGNI_FAIL: 'USER_LOGNI_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: "FETCH_GENDER_START",
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

    FETCH_POSITION_START: "FETCH_POSITION_START",
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

    FETCH_ROLE_START: "FETCH_ROLE_START",
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",

    //save user
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
    CREATE_USER_FAIL: "CREATE_USER_FAIL",

    //edit user
    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_FAIL: "EDIT_USER_FAIL",

    //get all user
    FETCT_ALL_USER_SUCCESS: "FETCT_ALL_USER_SUCCESS",
    FETCT_ALL_USER_FAIL: "FETCT_ALL_USER_FAIL",

    // delete user
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
    DELETE_USER_FAIL: "DELETE_USER_FAIL",

    //get all top doctor
    FETCT_ALL_TOP_DOCTOR_SUCCESS: "FETCT_ALL_TOP_DOCTOR_SUCCESS",
    FETCT_ALL_TOP_DOCTOR_FAIL: "FETCT_ALL_TOP_DOCTOR_FAIL",

    //get all doctor
    FETCT_ALL_DOCTOR_SUCCESS: "FETCT_ALL_DOCTOR_SUCCESS",
    FETCT_ALL_DOCTOR_FAIL: "FETCT_ALL_DOCTOR_FAIL",

    //create infor detail doctor
    CREATE_INFOR_DOCTOR_SUCCESS: "CREATE_INFOR_DOCTOR_SUCCESS",
    CREATE_INFOR_DOCTOR_FAIL: "CREATE_INFOR_DOCTOR_FAIL",

     //get all doctor
     FETCT_GET_ALLCODES_TIME_SUCCESS: "FETCT_GET_ALLCODES_TIME_SUCCESS",
     FETCT_GET_ALLCODES_TIME_FAIL: "FETCT_GET_ALLCODES_TIME_FAIL",
     
     //fetch require doctor infor
     FETCT_DOCTOR_REQUIRE_INFOR_SUCCESS:"FETCT_DOCTOR_REQUIRE_INFOR_SUCCESS",
     FETCT_DOCTOR_REQUIRE_INFOR_FAIL:"FETCT_DOCTOR_REQUIRE_INFOR_FAIL",

     //fetch get all specialty
     FETCH_GET_ALL_SPECIALTY_SUCCESS:'FETCH_GET_ALL_SPECIALTY_SUCCESS',
     FETCH_GET_ALL_SPECIALTY_ERROR:'FETCH_GET_ALL_SPECIALTY_ERROR'
})

export default actionTypes;