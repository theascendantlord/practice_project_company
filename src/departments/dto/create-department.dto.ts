import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    @Transform(( { value }) => {
        if(typeof value !== "string") throw new BadRequestException("Department Name must be a string.")
        if(!/^[a-zA-Z ]+$/.test(value)) throw new BadRequestException("Department Name must contain values only a-z.")
        return value.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    })
    name: string
}
