import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Float, Query, Args } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { ProfessorInput } from 'src/types/inputs/professorInput.model';
import { Professor } from './professor.model';
import { Exam } from 'src/exam/exam.model';
import { ExamRecord } from 'src/exam/examRecord.model';
import { GetAuthenticatedProfessor } from 'src/decorators/professor.decorator';
import { Subject } from 'src/subject/subject.model';

@Resolver(Professor)
export class ProfessorResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Professor])
  async getAllProfessors(): Promise<Professor[] | null> {
    return await this.prismaService.professor.findMany();
  }

  @Mutation(() => Professor)
  async createProfessor(
    @Args({ name: 'input', type: () => ProfessorInput }) input: ProfessorInput,
  ): Promise<Professor | null> {
    let professor;
    const hashedPassword = await argon2.hash(
      input.firstName.concat(input.lastName),
    );
    try {
      professor = await this.prismaService.professor.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: hashedPassword,
          jmbg: input.jmbg,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error('error');
    }
    return professor;
  }

  @Mutation(() => Boolean)
  async registerPassedExam(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args({ name: 'points', type: () => Float }) points: number,
  ): Promise<Boolean> {
    ///Finding grade based on value
    let grade = await this.prismaService.grade.findFirst({
      where: {
        value: 5,
      },
    });
    if (points >= 51 && points < 61) {
      grade = await this.prismaService.grade.findFirst({
        where: {
          value: 6,
        },
      });
    } else if (points >= 61 && points < 71) {
      grade = await this.prismaService.grade.findFirst({
        where: {
          value: 7,
        },
      });
    } else if (points >= 71 && points < 81) {
      grade = await this.prismaService.grade.findFirst({
        where: {
          value: 8,
        },
      });
    } else if (points >= 81 && points < 91) {
      grade = await this.prismaService.grade.findFirst({
        where: {
          value: 9,
        },
      });
    } else if (points >= 91 && points <= 100) {
      grade = await this.prismaService.grade.findFirst({
        where: {
          value: 10,
        },
      });
    }
    if (!grade) {
      throw new Error('Grades are not added into table');
    }
    const exam = await this.prismaService.examRecord.update({
      where: {
        id,
      },
      data: {
        gradeID: grade.id,
        singed: false,
        passed: true,
        points,
      },
    });

    if (exam) {
      return true;
    }
    return false;
  }

  @Mutation(() => Professor)
  async loginProfessor(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @GetAuthenticatedProfessor() req: any,
  ): Promise<Professor | null> {
    ///Finding professor based on unique field
    const professor = await this.prismaService.professor.findUnique({
      where: {
        email,
      },
    });
    if (!professor) {
      throw new Error('There is no such professor');
    }
    ///Verify
    const valid = await argon2.verify(professor.password, password);
    if (!valid) {
      throw new Error('Wrong credentials');
    }
    ///Add professorId in session
    req.session!.professorID = professor.id;

    return professor;
  }

  @Query(() => Professor)
  //   @UseMiddleware(isAuthP)
  async meProfessor(
    @GetAuthenticatedProfessor() req: any,
  ): Promise<Professor | null> {
    return await this.prismaService.professor.findUnique({
      where: {
        id: req.session.professorID,
      },
    });
  }

  @Query(() => [Exam])
  //   @UseMiddleware(isAuthP)
  async examsFromCurrentExamPeriod(@GetAuthenticatedProfessor() req: any) {
    ///Getting Exams from current examination period
    const dt = Date.now();
    const date = new Date(dt);
    const exams = await this.prismaService.exam.findMany({
      where: {
        subject: {
          professorID: req.session.professorID,
        },
        examinationPeriod: {
          beginningDate: {
            gte: date,
          },
        },
      },
      select: {
        date: true,
        subject: {
          select: {
            id: true,
            espp: true,
            subjectName: true,
            type: true,
            modul: {
              select: {
                moduleCode: true,
              },
            },
          },
        },
        examRecord: {
          select: {
            student: {
              select: {
                firstName: true,
                lastName: true,
                brind: true,
              },
            },
          },
        },
      },
    });
    console.log(exams);

    return exams;
  }

  @Query(() => [ExamRecord])
  async studentsWhoSingedExam(
    @GetAuthenticatedProfessor() req: any,
    @Args({ name: 'subjectID', type: () => String }) subjectID: string,
  ) {
    ///Students who singed particular exam
    const dt = Date.now();
    const date = new Date(dt);
    return await this.prismaService.examRecord.findMany({
      where: {
        exam: {
          subject: {
            id: subjectID,
            professorID: req.session.professorID,
          },
          date: {
            gte: date,
          },
        },
        singed: true,
      },
      include: {
        student: true,
        exam: {
          include: {
            subject: true,
          },
        },
      },
    });
  }

  @Query(() => [Subject])
  async professorSubjects(@GetAuthenticatedProfessor() req: any) {
    return await this.prismaService.subject.findMany({
      where: {
        professorID: req.session.professorID,
      },
      select: {
        id: true,
        subjectName: true,
        espp: true,
        modul: true,
        modulID: true,
        type: true,
      },
    });
  }

  @Query(() => [Exam])
  async professorExams(@GetAuthenticatedProfessor() req: any) {
    return await this.prismaService.exam.findMany({
      where: {
        subject: {
          professorID: req.session.professorID,
        },
      },
      select: {
        id: true,
        date: true,
        subject: true,
      },
    });
  }
}
