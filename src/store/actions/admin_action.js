import actionTypes from './actionTypes';
import { getAllCodes, createUser, getAllUserOrOnlyUser,deleteUser,editUser,getDoctorHome,getAllDoctors,createDescriptionDoctor,  } from "../../services/userservice";
import { getAllSpecialty } from '../../services/specialtyService';
import { getAllClinic } from '../../services/clinicService';

import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let response = await getAllCodes("GENDER");
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            throw error;
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

//positionData

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let response = await getAllCodes("POSITION");
            if (response && response.errCode === 0) {
                dispatch(fetchPositionSuccess(response.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            throw error;
        }
    }
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});

//roleData

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let response = await getAllCodes("ROLE");
            if (response && response.errCode === 0) {
                dispatch(fetchRoleSuccess(response.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            throw error;
        }
    }
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let response = await createUser(data);
            if (response && response.errCode === 0) {
                toast.success("Created User success");
                dispatch(createSuccess());
                dispatch(fetchAllUser());
            }
            else {
                toast.error("Created User error");
                dispatch(createFail());
            }
        } catch (error) {
            toast.error("Created User error");
            dispatch(createFail());
            throw error;
        }
    }
}

export const createSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

//get all user
export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllUserOrOnlyUser("All");
            if (response && response.errCode === 0) {
                //gán thêm hàm reverse để đảo array để sort
                let allUser = response.user.reverse();
                dispatch(fetchAllUserSuccess(allUser));
            }
            else {
                dispatch(fetchAllUserFALI());
            }
        } catch (error) {
            dispatch(fetchAllUserFALI());
            throw error;
        }
    }
}

export const fetchAllUserSuccess = (dataUser) => ({
    type: actionTypes.FETCT_ALL_USER_SUCCESS,
    data: dataUser
})
export const fetchAllUserFALI = () => ({
    type: actionTypes.FETCT_ALL_USER_FAIL
})


//delete user

export const deleteOneUser = (idUser) => {
    return async (dispatch, getState) => {
        try {
            let response = await deleteUser(idUser);
            if (response && response.errCode === 0) {
                toast.success("Deleted User success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUser());
            }
            else {
                toast.error("Deleted User error");
                dispatch(deleteUserFALI());
            }
        } catch (error) {
            toast.error("Deleted User error");
            dispatch(deleteUserFALI());
            throw error;
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFALI = () => ({
    type: actionTypes.DELETE_USER_FAIL
})


//edit user
export const editOneUser = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            let response = await editUser(dataUser);
            if (response && response.errCode === 0) {
                toast.success("Edit User success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUser());
            }
            else {
                toast.error("Edit User error");
                dispatch(editUserFALI());
            }
        } catch (error) {
            toast.error("Edit User error");
            dispatch(editUserFALI());
            throw error;
        }
    }
}

export const editUserSuccess = (dataUser) => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFALI = () => ({
    type: actionTypes.EDIT_USER_FAIL
})


//get all doctor top
export const fetchAllTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let response= await getDoctorHome(10);
            if (response && response.errCode === 0) {
                dispatch(fetchAllTopDoctorSuccess(response.data));
            }
            else {
                dispatch(fetchAllTopDoctorFALI());
            }
        } catch (error) {
            dispatch(fetchAllTopDoctorFALI());
            throw error;
        }
    }
}

export const fetchAllTopDoctorSuccess = (dataDoctor) => ({
    type: actionTypes.FETCT_ALL_TOP_DOCTOR_SUCCESS,
    data: dataDoctor
})
export const fetchAllTopDoctorFALI = () => ({
    type: actionTypes.FETCT_ALL_TOP_DOCTOR_FAIL
})


//get all doctor 
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let response= await getAllDoctors();
            if (response && response.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(response.data));
            }
            else {
                dispatch(fetchAllDoctorsFALI());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFALI());
            throw error;
        }
    }
}

export const fetchAllDoctorsSuccess = (dataDoctor) => ({
    type: actionTypes.FETCT_ALL_DOCTOR_SUCCESS,
    data: dataDoctor
})
export const fetchAllDoctorsFALI = () => ({
    type: actionTypes.FETCT_ALL_DOCTOR_FAIL
})


//get all doctor 
export const fetchCreateDoctorInfor = (data) => {
    return async (dispatch, getState) => {
        try {
            let response= await createDescriptionDoctor(data);
            if (response && response.errCode === 0) {
                toast.success("Create infor doctor success");
                dispatch(fetchCreateDoctorInforSuccess(response.data));
            }
            else {
                toast.error("Create infor doctor error");
                dispatch(fetchCreateDoctorInforFALI());
            }
        } catch (error) {
            toast.error("Create infor doctor error");
            dispatch(fetchCreateDoctorInforFALI());
            throw error;
        }
    }
}

export const fetchCreateDoctorInforSuccess = (dataDoctor) => ({
    type: actionTypes.CREATE_INFOR_DOCTOR_SUCCESS,
    data: dataDoctor
})
export const fetchCreateDoctorInforFALI = () => ({
    type: actionTypes.CREATE_INFOR_DOCTOR_FAIL
})


//get all codes 
export const fetchAllCodesTime = () => {
    return async (dispatch, getState) => {
        try {
            let response= await getAllCodes("TIME");
            if (response && response.errCode === 0) {
                dispatch(fetchAllCodesSuccess(response.data));
            }
            else {
                dispatch(fetchAllCodesFALI());
            }
        } catch (error) {
            dispatch(fetchAllCodesFALI());
            throw error;
        }
    }
}

export const fetchAllCodesSuccess = (dataTime) => ({
    type: actionTypes.FETCT_GET_ALLCODES_TIME_SUCCESS,
    data: dataTime
})
export const fetchAllCodesFALI = () => ({
    type: actionTypes.FETCT_GET_ALLCODES_TIME_FAIL
})

export const getDoctorRequireInfor=()=>{
    return async (dispatch, getState) => {
        try {
            let resPrice= await getAllCodes("PRICE");
            let resPayment= await getAllCodes("PAYMENT");
            let resProvice= await getAllCodes("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvice && resProvice.errCode === 0 &&resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode===0){
                let data={
                    resPrice:resPrice.data,
                    resPayment:resPayment.data,
                    resProvice:resProvice.data,
                    resSpecialty:resSpecialty.data,
                    resClinic:resClinic.data
                }
                dispatch(getDoctorRequireInforSuccess(data));
            }
            
            else {
                dispatch(getDoctorRequireInforFALI());
            }
        } catch (error) {
            dispatch(getDoctorRequireInforFALI());
            throw error;
        }
    }
}

export const getDoctorRequireInforSuccess = (dataInforDoctorRequire) => ({
    type: actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_SUCCESS,
    data: dataInforDoctorRequire
})
export const getDoctorRequireInforFALI = () => ({
    type: actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_FAIL
})


// export const getAllSpecialty=()=>{
//     return async (dispatch, getState) => {
//         try {
//             let resPrice= await getAllCodes("PRICE");
//             if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvice && resProvice.errCode === 0 &&resSpecialty && resSpecialty.errCode === 0 && resClinic && resClinic.errCode===0){
//                 let data={
//                     resPrice:resPrice.data,
//                     resPayment:resPayment.data,
//                     resProvice:resProvice.data,
//                     resSpecialty:resSpecialty.data,
//                     resClinic:resClinic.data
//                 }
//                 dispatch(getAllSpecialtySuccess(data));
//             }
            
//             else {
//                 dispatch(getAllSpecialtyFALI());
//             }
//         } catch (error) {
//             dispatch(getAllSpecialtyFALI());
//             throw error;
//         }
//     }
// }

// export const getAllSpecialtySuccess = (dataInforDoctorRequire) => ({
//     type: actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_SUCCESS,
//     data: dataInforDoctorRequire
// })
// export const getAllSpecialtyFALI = () => ({
//     type: actionTypes.FETCT_DOCTOR_REQUIRE_INFOR_FAIL
// })