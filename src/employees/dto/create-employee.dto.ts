import { BadRequestException } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Role } from "@prisma/client";

export class CreateEmployeeDto {

    @IsString()
    @Transform(({ value  }) => {
        if(typeof value !== "string") throw new BadRequestException("Name must be string.")
        if(!/^[a-zA-Z ]+$/.test(value)) throw new BadRequestException("Name must contain alphabets only.")
        return value.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    })
    name: string;


    @Type(() => Number)
    @IsNumber()
    @Min(1)
    departmentId: number

    @Transform(({ value  }) => value.toLowerCase())
    @IsString()
    @IsEmail()
    email: string

    @IsEnum(Role)
    @Transform(({value}) => value.toUpperCase())
    role: Role  


    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    currentSalary: number
}
