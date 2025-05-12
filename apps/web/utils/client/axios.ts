import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const apiClient = {
    get: async <T>(url: string): Promise<T> => {
        const res = await axios.get(`${API_BASE}${url}`);
        return res.data;
    },

    post: async <T>(url: string, data: unknown): Promise<T> => {
        const res = await axios.post(`${API_BASE}${url}`, data);
        return res.data;
    },

    put: async <T>(url: string, data: unknown): Promise<T> => {
        const res = await axios.put(`${API_BASE}${url}`, data);
        return res.data;
    },

    patch: async <T>(url: string, data: unknown): Promise<T> => {
        const res = await axios.patch(`${API_BASE}${url}`, data);
        return res.data;
    },

    delete: async <T>(url: string): Promise<T> => {
        const res = await axios.delete(`${API_BASE}${url}`);
        return res.data;
    },
};

export default apiClient;
