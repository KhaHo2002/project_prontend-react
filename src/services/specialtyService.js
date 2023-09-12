
import axios from "../axios";
const handleCreatespecialty = (data) => {
    try {
        return axios.post('/api/create-specialty', data)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}


const getAllSpecialty = () => {
    try {
        return axios.get(`/api/get-all-specialty`);
    } catch (error) {
        throw error;
    }
}


const getDetailSpecialtyById = (data) => {
    try {
        return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
    } catch (error) {
        throw error;
    }
}

const editSpecialty = (data) => {
    try {
        return axios.put(`/api/edit-specialty`, data);
    } catch (error) {
        throw error;
    }
}

const upCloundImageSpecialty = (data) => {
    try {
        return axios.post(`/api/upload-image-clound-specialty`, data);
    } catch (error) {
        throw error;
    }
}

const deleteSpecialty = (id) => {
    try {
        return axios.delete('/api/delete-specialty-by-id', {
            data: { id }
        });
    } catch (error) {
        throw error;
    }
}

export { handleCreatespecialty, getAllSpecialty, getDetailSpecialtyById, editSpecialty, upCloundImageSpecialty, deleteSpecialty };

