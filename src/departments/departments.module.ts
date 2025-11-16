import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [DbModule]
})
export class DepartmentsModule {}
