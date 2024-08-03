import axios from 'axios';

const API_BASE_URL = 'https://assignment-todolist-api.vercel.app/api';
const tenantId = 'yebago';

const api = axios.create({
    baseURL: `${API_BASE_URL}/${tenantId}`,
});

export const fetchItems = async () => {
    const response = await api.get('/items');
    return response.data;
};

export const fetchItemById = async (itemId: string) => {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
};

export const createItem = async (name: string) => {
    try {
        const response = await api.post('/items', { name });
        console.log('createItem response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('createItem error:', error.response?.data || error.message);
        } else {
            console.error('createItem error:', error);
        }
        throw error;
    }
};

export const updateItem = async (itemId: string, updates: { name?: string; isCompleted?: boolean; memo?: string; imageUrl?: string }) => {
    const response = await api.patch(`/items/${itemId}`, updates);
    return response.data;
};

export const deleteItem = async (itemId: string) => {
    const response = await api.delete(`/items/${itemId}`);
    return response.data;
};

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
