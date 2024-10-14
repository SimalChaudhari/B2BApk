import axios from 'axios';

const BASE_URL = 'http://192.168.1.112:3000';

export const fetchItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items`);
        return response?.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Fetch a single item by ID
export const fetchItemById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/items/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching item with ID ${id}:`, error);
        throw error;
    }
};
