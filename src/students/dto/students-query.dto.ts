import { IsOptional, IsString, IsIn } from 'class-validator';
import { PaginationDTO } from '../../auth/dto/pagination.dto.js';

export class StudentsQueryDTO extends PaginationDTO {

    @IsOptional()
    @IsString()
    search?: string;
    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsIn(['prn', 'name', 'email', 'department'])
    sortBy?: 'prn' | 'name' | 'email' | 'department';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder ?: 'asc' | 'desc';

}