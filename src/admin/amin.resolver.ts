import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Float, Query, Args } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { ProfessorInput } from 'src/types/inputs/professorInput.model';
import { GetAuthenticatedUser } from 'src/decorators/student.decorator';
import { Exam } from 'src/exam/exam.model';
import { ExamRecord } from 'src/exam/examRecord.model';
import { Admin } from './admin.model';

@Resolver(Admin)
export class AdminResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation(() => Boolean)
  async loginAdmin(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ) {
    return true;
  }
}
