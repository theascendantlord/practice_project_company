import { Injectable } from '@nestjs/common';
import { CreateSalaryHistoryDto } from './dto/create-salary-history.dto';
import { UpdateSalaryHistoryDto } from './dto/update-salary-history.dto';

@Injectable()
export class SalaryHistoryService {
  create(createSalaryHistoryDto: CreateSalaryHistoryDto) {
    return 'This action adds a new salaryHistory';
  }

  findAll() {
    return `This action returns all salaryHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaryHistory`;
  }

  update(id: number, updateSalaryHistoryDto: UpdateSalaryHistoryDto) {
    return `This action updates a #${id} salaryHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaryHistory`;
  }
}
