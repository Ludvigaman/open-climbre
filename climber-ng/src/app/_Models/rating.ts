import { UserRating } from "./userRating";
import { Star } from "./star";

export class Rating {
    id: string;
    rate: Star;
    userRatings: UserRating[];
}
