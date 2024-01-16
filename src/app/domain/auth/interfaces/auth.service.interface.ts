import { User } from '../../../interfaces/user';

export interface RegisterUser extends Pick<User, 'email' | 'username'> {
  password: string;
}

export interface UserResponse {
  token: string;
  user: User;
}

export interface UserLogin {
  login: string;
  password: string;
}
