import { Color } from "./color";
import { Grade } from "./grade";
import { Rating } from "./rating";
import { User } from "./user";

export class Wall {
    id: string;
    name: string;
    grade: Grade;
    color: Color;
    description?: string;
    created: Date;
    removed?: Date;
    userId: number;
    rating?: Rating;
    anchor: number;
    typesJSON: string;
}
