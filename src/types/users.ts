export interface UsersLogin {
  username: string;
  password: string;
}

export interface UsersRegister extends UsersLogin{
  confirmPassword: string;
  type?: string;
}
