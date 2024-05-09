export class LoginReponseDto {
    token: string;
    username: string;
    role: string;
    expires: string;
    mustChangePassword: boolean;
    userId: number;
}