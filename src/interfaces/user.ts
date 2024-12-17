export interface User {
  id: number;
  name: string;
  email: string;
  telefono: string;
  password?: string;
  rol_id: number;
}

export interface CreateUserRequest {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  rol_id: string; 
}

export interface CreateUserByPhoneRequest {
  telefono: string;
}

export interface UpdateUserRequest {
  id: number;
  nombre?: string;
  email?: string;
  telefono?: string;
  password?: string;
  rol_id?: string;
}

export interface LoginByPhoneRequest {
  telefono: string;
}

export interface LoginByEmailAndPasswordRequest {
  email: string;
  password: string;
}