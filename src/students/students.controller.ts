import { Controller, Get, Post, Body, Query,} from '@nestjs/common';
import { StudentsService } from './students.service.js';
import type { Student } from './students.interface.js';
import { StudentsQueryDTO } from './dto/students-query.dto.js';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}
    
    @Get()
        getStudents(@Query() query:StudentsQueryDTO) {
            console.log('GET STUDENTS CONTROLLER HIT');
            return this.studentsService.getAllStudents(query);
        }
    
    @Post()
    addStudent(@Body() student:Student){
        console.log('POST STUDENTS CONTROLLER HIT');
        return this.studentsService.addStudent(student);
    }
}
