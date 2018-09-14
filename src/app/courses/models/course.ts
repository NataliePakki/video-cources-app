import { CourseInterface } from './course.model';
import { Author } from './author.model';

export class Course implements CourseInterface {
    id: number;
    title: string;
    authors: Author[];
    creationDate: string;
    duration: Number;
    description: string;
    topRated: boolean;

    constructor(id: number, title: string, authors: Author[], description: string, duration?: Number, creationDate?: string, topRated: boolean = false) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.duration = duration;
        this.creationDate = creationDate;
        this.topRated = topRated;
    }
}
