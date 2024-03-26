class User{
    id : number| undefined;
    username : string | undefined;
    password : string |undefined;
    salt : string | undefined;
    role : string | undefined;  
}

export { User };

export interface UpdUserDTO {
    id: number;
    userName: string;
    role: string;
  }