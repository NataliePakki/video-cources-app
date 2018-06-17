import {CourseItemInterface} from './course-item.model';

// TODO: generate id and set creationDate in condtructor
export class CourseItem implements CourseItemInterface {
    id: number;
    title: string;
    creationDate: string;
    duraction: Number;
    description: string;

    constructor(id: number, title: string, description: string, duraction?: Number, creationDate?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duraction = duraction;
        this.creationDate = creationDate;
    }
}
