import { Courses } from './courses';

export interface Student {
    id?: any;
    name?: string;
    last_name?: string;
    birthdate?: string;
    studentNr?: string;
    courses?: Courses[];
    courses2?: string[];
    fiboId?: string;
}
