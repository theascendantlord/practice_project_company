import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    newSalary?: number
}
