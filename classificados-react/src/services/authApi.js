import axios from 'axios';

const AUTH_STORAGE_KEY = 'classificados_auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const auth = getStoredAuth();

    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
});

export function getStoredAuth() {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);

        if (!raw) {
            return null;
        }

        const auth = JSON.parse(raw);

        if (!auth?.token || !auth?.expiresAt) {
            return null;
        }

        if (new Date(auth.expiresAt).getTime() <= Date.now()) {
            clearStoredAuth();
            return null;
        }

        return auth;
    } catch {
        clearStoredAuth();
        return null;
    }
}

export function storeAuth(auth) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function register({ nome, email, password }) {
    const response = await api.post('/auth/register', {
        nome,
        email,
        password,
    });

    return response.data;
}

export async function login({ email, password }) {
    const response = await api.post('/auth/login', {
        email,
        password,
    });

    return response.data;
}

export default api;
