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
        return {success:true, data: response.data};
    }catch (error){
        return {success:false, error: error.message};
    }
} 

export const getTempSensorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-temp-sensor`);
        return {success: true, data: response.data};
    }catch(error){
        return null;
    }
}

export const getHumiditySensorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-humidity-sensor`);
        return {success:true, data: response.data};

    }catch(error){

    }
}

export const getColorimetrySensorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-colorimetry-sensor`);
        return {success: true, data: response.data};
    }catch(error){

    }
}

export const getPredictionData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-prediction`);
        return {success: true, data:response.data};
        console.log("Datos", response.data);
    }catch(error){

    }
}

