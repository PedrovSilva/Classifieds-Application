import axios from 'axios';
import type { AuthUser, LoginCredentials, RegisterCredentials } from '../types/auth';

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

export function getStoredAuth(): AuthUser | null {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);

        if (!raw) {
            return null;
        }

        const auth = JSON.parse(raw) as AuthUser;

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

export function storeAuth(auth: AuthUser): void {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function register({
    nome,
    email,
    password,
}: RegisterCredentials): Promise<AuthUser> {
    const response = await api.post<AuthUser>('/auth/register', {
        nome,
        email,
        password,
    });

    return response.data;
}

export async function login({
    email,
    password,
}: LoginCredentials): Promise<AuthUser> {
    const response = await api.post<AuthUser>('/auth/login', {
        email,
        password,
    });

    return response.data;
}

export default api;
