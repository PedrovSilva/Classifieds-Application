export type AuthMode = 'login' | 'register';

export interface AuthSubmitPayload {
  mode: AuthMode;
  nome: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  nome: string;
  email: string;
  token: string;
  expiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nome: string;
  email: string;
  password: string;
}
