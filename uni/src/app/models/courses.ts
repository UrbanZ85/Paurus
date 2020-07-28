import { Student } from './student';
import { Professor } from './profesor';

export interface Courses {
    id?: any;
    name?: string;
    professor?: string;
    students?: Student[];
    professors?: Professor[];
}
