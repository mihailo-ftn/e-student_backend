import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AdminResolver } from './amin.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AdminResolver, PrismaService],
})
export class AdminModule {}
