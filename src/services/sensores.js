import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getPhSensorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-ph-sensor`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getTurbidezSensorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-turbidez-sensor`);
        console.log("Error: ", response.data);
        return {success:true, data: response.data};
    }catch (error){
        return {success:false, error: error.message};
    }
} 

