export interface User {
  username: string;
  email: string;
  photo?: string;
}

export interface UserInfos {
  token?: string;
  user?: User;
}
