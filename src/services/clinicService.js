
import axios from "../axios";
const createClinic = (data) => {
    try {
        return axios.post('/api/create-clinic', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}


const getAllClinic = () => {
    try {
        return axios.get(`/api/get-all-clinic`);
    } catch (error) {
        throw error;
    }
}


const getDetailClinicById = (id) => {
    try {
        return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
    } catch (error) {
        throw error;
    }
}

const upCloundImageClinic = (data) => {
    try {
        return axios.post(`/api/upload-image-clound-clinic`, data);
    } catch (error) {
        throw error;
    }
}

const editClinic = data => {

    try {
        return axios.put(`/api/edit-clinic`, data);
    } catch (error) {
        throw error;
    }
}

export { createClinic, getAllClinic, getDetailClinicById, upCloundImageClinic, editClinic };

