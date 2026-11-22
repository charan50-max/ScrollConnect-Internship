
import {
    Controller,
    Get,
    Post,
    Body,
    Query,
} from '@nestjs/common';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiBody,
} from '@nestjs/swagger';

import { StudentsService } from './students.service.js';
import type { Student } from './students.interface.js';
import { StudentsQueryDTO } from './dto/students-query.dto.js';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all students',
        description: 'Retrieve students with pagination, search, filtering and sorting.',
    })
    @ApiQuery({ name: 'skip', required: false, type: Number, example: 0 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, type: String, example: 'Charan' })
    @ApiQuery({ name: 'department', required: false, type: String, example: 'IoT' })
    @ApiQuery({
        name: 'sortBy',
        required: false,
        enum: ['prn', 'name', 'email', 'department'],
        example: 'name',
    })
    @ApiQuery({
        name: 'sortOrder',
        required: false,
        enum: ['asc', 'desc'],
        example: 'asc',
    })
    @ApiResponse({
        status: 200,
        description: 'Students retrieved successfully.',
    })
    getStudents(@Query() query: StudentsQueryDTO) {
        return this.studentsService.getAllStudents(query);
    }

    @Post()
    @ApiOperation({
        summary: 'Add a new student',
        description: 'Create a new student record in the database.',
    })
    @ApiBody({
        description: 'Student information',
        schema: {
            type: 'object',
            properties: {
                prn: { type: 'string', example: '123456789' },
                name: { type: 'string', example: 'Charan Shetty' },
                email: { type: 'string', example: 'charan@example.com' },
                department: { type: 'string', example: 'IoT' },
            },
            required: ['prn', 'name', 'email', 'department'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Student created successfully.',
    })
    @ApiResponse({
        status: 409,
        description: 'A student with this PRN already exists.',
    })
    addStudent(@Body() student: Student) {
        return this.studentsService.addStudent(student);
    }
}
