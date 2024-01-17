import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [StudentResolver, PrismaService],
})
export class StudentModule {}
