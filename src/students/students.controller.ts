import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import type { Student } from './students.interface.js';
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
    
    @Get()
        getStudents() {
            return this.studentsService.getAllStudents();
        }
    
    @Post()
    addStudent(@Body() student:Student){
        return this.studentsService.addStudent(student);
    }
}
