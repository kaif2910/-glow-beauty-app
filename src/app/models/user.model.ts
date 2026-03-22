export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
