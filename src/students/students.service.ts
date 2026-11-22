
import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Student } from './students.interface.js';
import { StudentsQueryDTO } from './dto/students-query.dto.js';

@Injectable()
export class StudentsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllStudents(query:StudentsQueryDTO): Promise<Student[]> {
        const skip = Number(query.skip ?? 0);
        const limit = Number(query.limit ?? 10);
        const search= query.search;
        const department=query.department;
        const sortBy = query.sortBy??'name';
        const sortOrder=query.sortOrder??'asc';
        console.log('GET - Skip:', skip);
        console.log('GET - Limit:', limit);

                // Filtering and searching
        const where = {
            ...(department
                ? {
                    department: {
                        equals: department,
                        mode: 'insensitive' as const
                    }
                }
                : {}),

            ...(search
                ? {
                    OR: [
                        {
                            prn: {
                                contains: search,
                                mode: 'insensitive' as const
                            }
                        },
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive' as const
                            }
                        },
                        {
                            email: {
                                contains: search,
                                mode: 'insensitive' as const
                            }
                        },
                        {
                            department: {
                                contains: search,
                                mode: 'insensitive' as const
                            }
                        }
                    ]
                }
                : {})
        };

        // Sorting
        const orderBy =
            sortBy === 'prn' ? { prn: sortOrder } :
            sortBy === 'email' ? { email: sortOrder } :
            sortBy === 'department' ? { department: sortOrder } :
            { name: sortOrder };

        // Fetching data
        return this.prisma.student.findMany({
            where,
            orderBy,
            skip,
            take: limit
        });
    }

    async addStudent(student: Student): Promise<Student> {
        const newStudent = await this.prisma.student.create({
            data: student,
        });

        console.log('Student added:', newStudent);

        return newStudent;
    }
}
