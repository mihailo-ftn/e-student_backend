import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExamResolver } from './exam.resolver';

@Module({
    imports: [],
      controllers: [],
      providers: [ExamResolver, PrismaService],
})
export class ExamModule {}
