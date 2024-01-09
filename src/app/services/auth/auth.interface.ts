export interface SignUp {
  email: string;
  username: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  photo?: string;
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
