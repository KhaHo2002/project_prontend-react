import axios from "../axios";
const countDashboard = () => {
    try {
        return axios.get('/api/count-dashboard')
    } catch (error) {
        console.error("An error occurred during login:", error);
        throw error;
    }
}

export {
    countDashboard
}