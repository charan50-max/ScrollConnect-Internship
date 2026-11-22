
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, IsPositive } from 'class-validator';

export class PaginationDTO {
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    skip: number = 0;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @IsOptional()
    limit: number = 10;
}
