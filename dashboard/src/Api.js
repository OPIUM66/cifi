import axios from 'axios';

const BASE_URL = 'http://localhost:4444'; // API base URL

// Get all items
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data; // { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
};

// Check connection
export const connect = async (ssid, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/connect`, {ssid, password} );
    
    return response.data; // { success: true, message: "Connected successfully!" }
  } catch (error) {
    console.error('Error checking connection:', error);
    throw error;
  }
};

// Status check
export const checkStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/check`);
    return response.data; // { success: true, status: "API is working!" }
  } catch (error) {
    console.error('Error checking status:', error);
    throw error;
  }
};
