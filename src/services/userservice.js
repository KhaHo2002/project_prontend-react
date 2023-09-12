
import axios from "../axios";
const handleLogin = (emailUser, passwordUser) => {
    try {
        return axios.post('/api/login', { email: emailUser, password: passwordUser })
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
}

const getAccount = (data) => {
    try {
        return axios.post('/api/change_account', data)
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
}

const changePassword = (data) => {
    try {
        return axios.post('/api/change_passwordAccount', data)
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
}

const getAllUserOrOnlyUser = (id) => {

    try {
        return axios.get(`/api/get-all-user?id=${id}`);
    } catch (error) {
        console.error("An error occurred while getting user data:", error);
        throw error;
    }
}

const createUser = (data) => {
    try {
        return axios.post('/api/create-user', data);
    } catch (error) {
        console.error("An error occurred while getting user data:", error);
        throw error;
    }

}

const deleteUser = (userId) => {
    try {
        return axios.delete('/api/delete-user', {
            data: {
                id: userId
            }
        })
    } catch (error) {
        console.error("An error occurred while deleting a user:", error);
        throw error;
    }
}


const editUser = (userData) => {
    try {
        return axios.put('/api/edit-user', userData)
    } catch (error) {
        throw error;
    }
}

const getAllCodes = (codes) => {
    try {
        return axios.get(`/api/get-allcodes?type=${codes}`)
    } catch (error) {
        throw error;
    }
}

const getDoctorHome = (limit) => {
    try {
        return axios.get(`/api/top-doctor-home?limit=${limit}`);
    } catch (error) {
        throw error;
    }
}

const getAllDoctors = () => {
    try {
        return axios.get(`/api/get-all-doctors`);
    } catch (error) {
        throw error;
    }
}

const createDescriptionDoctor = (data) => {
    try {
        return axios.post(`/api/save-infor-doctors`, data);
    } catch (error) {
        throw error;
    }
}

const getDetaiInforDoctor = (idDoctor) => {
    try {
        return axios.get(`/api/get-infor-detail-doctor?id=${idDoctor}`);
    } catch (error) {
        throw error;
    }
}

const createBulkScheduleDoctor = (dataDoctor) => {
    try {
        return axios.post(`/api/bulk-create-schedule`, dataDoctor);
    } catch (error) {
        throw error;
    }
}

const getScheduleDoctorByDate = (doctorId, date) => {
    try {
        return axios.get(`/api/schedule-doctor-by-date?doctorid=${doctorId}&date=${date}`);
    } catch (error) {
        throw error;
    }
}

const getDoctorExtraInforById = (doctorId) => {
    try {
        return axios.get(`/api/get-extra-infor-doctor?doctorid=${doctorId}`);
    } catch (error) {
        throw error;
    }
}

const getProfileDoctorById = (doctorId) => {
    try {
        return axios.get(`/api/get-profile-doctor-by-id?doctorid=${doctorId}`);
    } catch (error) {
        throw error;
    }
}

const createPatienBooking = (data) => {
    try {
        return axios.post(`/api/create-patient-book-appointment`, data);
    } catch (error) {
        throw error;
    }
}

const verifyBooking = (data) => {
    try {
        return axios.post(`/api/verify-patient-book-appointment`, data);
    } catch (error) {
        throw error;
    }
}

const upLoadCloundImageUser = (data) => {
    try {
        return axios.post(`/api/upload-image-clound-doctor-admin`, data);
    } catch (error) {
        throw error;
    }
}




export { handleLogin, getAllUserOrOnlyUser, createUser, deleteUser, editUser, getAllCodes, getDoctorHome, getAllDoctors, createDescriptionDoctor, getDetaiInforDoctor, createBulkScheduleDoctor, getScheduleDoctorByDate, getDoctorExtraInforById, getProfileDoctorById, createPatienBooking, verifyBooking, getAccount, changePassword, upLoadCloundImageUser };

