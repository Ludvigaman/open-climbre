import { UserWallProgress } from "../_Models/userWallProgress";

export class AuthenticateResponse {
    id: number;
    name: string;
    email: string;
    username: string;
    token: string;
    dateJoined: Date;
    progressList: UserWallProgress[];
}
