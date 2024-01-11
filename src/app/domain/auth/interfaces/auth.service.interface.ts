import { User } from '../../../interfaces/user';

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface Data {
  token: string;
  user: User;
}

export interface HttpSuccessReturn {
  data: Data;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface UserLogin {
  login: string;
  password: string;
}
