import { Injectable } from '@nestjs/common';
import {Student} from './students.interface.js';
@Injectable()
export class StudentsService {
    private students:Student[]=[];
    getAllStudents(): Student[]{
        return this.students;
    }
    addStudent(student:Student): Student{
        this.students.push(student);
        return student;
    }
}
