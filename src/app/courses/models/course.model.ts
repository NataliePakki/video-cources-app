import { Author } from './author.model';

export interface CourseInterface {
    id: number;
    title: string;
    authors: Author[];
    creationDate: string;
    duration: Number;
    description: string;
    topRated: boolean;
}
