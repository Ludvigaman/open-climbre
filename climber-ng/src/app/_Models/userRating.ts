import { Star } from "./star";
import { User } from "./user";

export class UserRating{
    id: string;
    author: User;
    comment: string;
    created: Date;
    rate: Star;
}