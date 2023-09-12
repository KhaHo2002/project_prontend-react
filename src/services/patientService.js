
import axios from "../axios";
const getAllPatient = (doctorid, date) => {
    try {
        return axios.get(`/api/get-list-patient?doctorid=${doctorid}&date=${date}`)
        // return axios.get(`/api/get-list-patient?doctorid=${data.doctorid}&date=${data.date}`)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}
const sendRemedyPatient = (data) => {
    try {
        return axios.post(`/api/send-remedy-patient`, data)
        // return axios.get(`/api/get-list-patient?doctorid=${data.doctorid}&date=${data.date}`)
    } catch (error) {
        console.error("An error occurred during login:", error);;
        throw error;
    }
}


export { getAllPatient, sendRemedyPatient };

