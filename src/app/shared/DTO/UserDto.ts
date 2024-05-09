class User{
    id? : number| undefined;
    username : string | undefined;
    password ?: string |undefined;
    salt? : string | undefined;
    role : string | undefined;  
}

export { User };

export interface UpdUserDTO {
    id: number;
    username: string;
    role: string;
  }

  export class NewUserDTO {
    username: string;
    password: string;
    role: string;
  
    constructor(username: string, password: string, role: string) {
      this.username = username;
      this.password = password;
      this.role = role;
    }
  }
export interface UserDTO {
  id?: number;
  username?: string;
  password?: string;
  salt?: string;
  role: string;
  }
  
  export interface Teacher {
    teacherId: number;
    name: string;
    user: User;
    courses: any; 
  }
  export interface Student {
    studentId: number;
    userName: string;
    user: User;
    courses: any;
  }
  export interface AddUserDTO {
    id: number;
    username: string;
  }