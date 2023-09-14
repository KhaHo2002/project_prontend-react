
import axios from "../axios";
const createHandbook = (data) => {
    try {
        return axios.post('/api/create-handbook', data)
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
}


const getAllHandbook = () => {
    try {
        return axios.get(`/api/get-all-handbook`);
    } catch (error) {
        throw error;
    }
}


const getDetailHandbook = (id) => {
    try {
        return axios.get(`/api/get-handbook-by-id?id=${id}`);
    } catch (error) {
        throw error;
    }
}

const upCloundImageHandbook = (data) => {
    try {
        return axios.post(`/api/upload-image-clound-handbook`, data);
    } catch (error) {
        throw error;
    }
}

const editHandbook = (data) => {
    try {
        return axios.put(`/api/edit-handbook-by-id`, data);
    } catch (error) {
        throw error;
    }
}

const deleteHandbook = (id) => {
    try {
        return axios.delete(`/api/delete-handbook-by-id`, { data: {id} });
    } catch (error) {
        throw error;
    }
}

export { createHandbook, getAllHandbook, getDetailHandbook, upCloundImageHandbook, editHandbook, deleteHandbook };

