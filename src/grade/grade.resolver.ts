import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { GradeInput } from 'src/types/inputs/gradeInput.model';
import { Grade } from './grade.model';

@Resolver(Grade)
export class GradeResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  
  @Query(() => [Grade])
  async getGrades(): Promise<Grade[] | null> {
    return await this.prismaService.grade.findMany();
  }

  @Mutation(() => Grade)
  async createGrade(
    @Args({ name: 'input', type: () => GradeInput }) input: GradeInput,
  ): Promise<Grade | null> {
    let grade;
    try {
      grade = await this.prismaService.grade.create({
        data: {
          value: input.value,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error('err');
    }
    return grade;
  }
}
