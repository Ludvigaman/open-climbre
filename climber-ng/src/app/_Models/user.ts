import { UserWallProgress } from "./userWallProgress";

export class User {

    id: number;
    name: string;
    username: string;
    email: string;
    dateJoined: Date;
    progressList: UserWallProgress[];

}
