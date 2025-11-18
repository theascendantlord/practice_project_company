import { IsEnum, IsNumber, IsOptional, Min } from "class-validator";
import { Role } from "@prisma/client";
import { Transform, Type } from "class-transformer";

export class QueryEmployeeDto{
    @IsOptional()
    @Transform(({value}) => value.toUpperCase())
    @IsEnum(Role)
    role: Role



    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @Min(0)
    minSalary : number


    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @Min(0)
    maxSalary : number



}