import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { SalaryHistoryModule } from './salary-history/salary-history.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, SalaryHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
