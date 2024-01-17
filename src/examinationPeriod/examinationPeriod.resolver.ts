import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { GetAuthenticatedUser } from 'src/decorators/student.decorator';
import { Exam } from 'src/exam/exam.model';
import { PrismaService } from 'src/prisma.service';
import { ExaminationPeriodInput } from 'src/types/inputs/examinationPeriodInput.model';
import { ExamInput } from 'src/types/inputs/examInput.model';
import { ExaminationPeriod } from './examinationPeriod.model';

@Resolver(ExaminationPeriod)
export class ExaminationPeriodResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [ExaminationPeriod])
  async getAllEXP() {
    return await this.prismaService.examinationPeriod.findMany();
  }

  @Mutation(() => ExaminationPeriod)
  async createExaminationPeriod(
    @Args({ name: 'input', type: () => ExaminationPeriodInput })
    input: ExaminationPeriodInput,
  ): Promise<ExaminationPeriod> {
    let examinationPeriod;
    try {
      examinationPeriod = await this.prismaService.examinationPeriod.create({
        data: {
          name: input.name,
          beginningDate: input.beginningDate,
          endDate: input.endDate,
          modulID: input.modulID,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
    return examinationPeriod;
  }

  @Query(() => Boolean)
  async isActive(@Args({ name: 'id', type: () => String }) id: string) {
    return this.prismaService.examinationPeriod.findUnique({
      where: {
        id,
      },
      select: {},
    });
  }

  @Query(() => ExaminationPeriod)
  // @UseMiddleware(isAuth)
  async examsFromExaminationPeriod(@GetAuthenticatedUser() req: any) {
    ///Find student based on studentId from session and validate
    const student = await this.prismaService.student.findUnique({
      where: {
        id: req.session.studentID,
      },
    });
    if (!student) {
      throw new Error('There is no such student');
    }

    const dt = Date.now();
    const date = new Date(dt);
    const examinationPeriod =
      await this.prismaService.examinationPeriod.findFirst({
        where: {
          modulID: student?.modulID,
          beginningDate: {
            gte: date,
          },
        },
        select: {
          exams: {
            select: {
              id: true,
              date: true,
              examRecord: {
                select: {
                  id: true,
                  studentID: true,
                  singed: true,
                },
              },
              subject: {
                select: {
                  espp: true,
                  subjectName: true,
                  type: true,
                  professor: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          },
          id: true,
          name: true,
          beginningDate: true,
          endDate: true,
        },
      });
    if (!examinationPeriod) {
      throw new Error('There are no examination periods currently');
    }
    return examinationPeriod;
  }

  @Mutation(() => Exam)
  async addExam(
    @Args({ name: 'input', type: () => ExamInput }) input: ExamInput,
  ) {
    let exam;
    try {
      exam = await this.prismaService.exam.create({
        data: {
          date: input.date,
          exPeriodID: input.exPeriodID,
          subjectID: input.subjectID,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error('err');
    }
    return exam;
  }

  @Query(() => ExaminationPeriod)
  async currentExPeriod() {
    const dt = Date.now();
    const date = new Date(dt);

    let exper = await this.prismaService.examinationPeriod.findFirst({
      where: {
        beginningDate: {
          gte: date,
        },
        endDate: {
          lte: date,
        },
      },
      include: {
        exams: {
          include: {
            subject: true,
          },
        },
      },
    });
    if (exper === null) {
      exper = await this.prismaService.examinationPeriod.findFirst({
        where: {
          beginningDate: {
            gte: date,
          },
          // endDate:{
          //   lte:date
          // }
        },
        include: {
          exams: {
            include: {
              subject: true,
            },
          },
        },
      });
    }
    return exper;
  }
}
