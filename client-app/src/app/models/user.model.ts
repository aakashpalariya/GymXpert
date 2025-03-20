export interface UserInfo {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp {
  email : string;
  firstName: string;
}