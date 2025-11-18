import { ConflictException, NotFoundException } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { DepartmentsService } from "src/departments/departments.service";
import { Role } from "@prisma/client";


export async function checkDepartmentExistence(id: number, dbService: DbService){
    const dep = await dbService.department.findUnique({
        where: {id}
    })
    if(!dep) throw new NotFoundException("Department does not exist.")
}


export async function checkEmployeeEmail(email: string,dbService: DbService){
    const employee = await dbService.employee.findUnique({
        where: {email}
    })
    if(employee)  throw new ConflictException("This email already exists.")
}


export async function employeesFilter(dbService: DbService, role?: Role){
    const where : any = {}
    if(role) where.role = role
    const employees = await dbService.employee.findMany({where})
    if(employees.length === 0) throw new NotFoundException("No employees found for the specified query.")
    return  employees
}