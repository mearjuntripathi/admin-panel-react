import axios from 'axios';

const root_api = process.env.REACT_APP_ROOT_URL;

async function signup(formData){
    try {
        const response = await axios.post(`${root_api}/auth/signup`, formData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function login(email, password) {
    try {
        const response = await axios.post(`${root_api}/auth/login`, { email, password });
        window.localStorage.setItem("name", response.data.info.name);
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("email", response.data.info.email);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function getPastTest() {
    try {
        const response = await axios.get(`${root_api}/past-test`, {
            headers: {
                'auth': window.localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function getTestsList() {
    try {
        const response = await axios.get(`${root_api}/test-list`, {
            headers: {
                'auth': window.localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function sendOTP(email) {
    try {
        const response = await axios.post(`${root_api}/auth/forget-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function updatePassword(email, otp, password) {
    try {
        const response = await axios.post(`${root_api}/auth/update-password`, { email, otp, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

async function createTest(formData) {
    try {
        const response = await axios.post(`${root_api}/orginized-test`, formData, {
            headers: {
                'auth': window.localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data.error : new Error('Network Error');
    }
}

async function getStudents(test_id){
    try{
        const response = await axios.get(`${root_api}/students-list?test_id=${test_id}`, {
            headers: {
                'auth': window.localStorage.getItem('token')
            }
        });
        return response.data;
    }catch(error){
        throw error.response ? error.response.data : new Error('Network Error');
    }
}

export { signup, login, getPastTest, getTestsList, sendOTP, updatePassword, createTest, getStudents };