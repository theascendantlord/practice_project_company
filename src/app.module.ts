import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { SalaryHistoryModule } from './salary-history/salary-history.module';
import { DbModule } from './db/db.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, SalaryHistoryModule, DbModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
