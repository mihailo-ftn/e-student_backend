import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostResolver } from './post.resolver';

@Module({
    imports: [],
      controllers: [],
      providers: [PostResolver, PrismaService],
})
export class PostModule {}
