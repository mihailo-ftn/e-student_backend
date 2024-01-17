import { Inject, UseGuards } from '@nestjs/common';
import { Mutation, Query, Args, Int, Float } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Student } from './student.model';
import * as argon2 from 'argon2';
import { StudentInput } from '../types/inputs/studentInput.model';
import { GetAuthenticatedUser } from 'src/decorators/student.decorator';
import { ExamRecord } from 'src/exam/examRecord.model';
import { isAuth } from 'src/decorators/isAuth.guard';

@Resolver(Student)
export class StudentResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Student])
  async getStudents() {
    return await this.prismaService.student.findMany();
  }

  @Mutation(() => Student)
  async createStudent(
    @Args({ name: 'input', type: () => StudentInput }) input: StudentInput,
  ) {
    let student;

    ///Default password is fisrtname + lastname
    const hashedPassword = await argon2.hash(
      input.firstName.concat(input.lastName),
    );

    //Creating student
    try {
      student = await this.prismaService.student.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          password: hashedPassword,
          lastName: input.lastName,
          birthDate: input.birthDate,
          brind: input.brind,
          middleName: input.middleName,
          jmbg: input.jmbg,
          modulID: input.modulID,
          classID: input.classID,
        },
      });
    } catch (err) {
      console.log(err.message); //OBRISI PRE PRODUKCIJE
      throw new Error('ER100');
    }

    return student;
  }

  @Mutation(() => Student)
  async login(
    @Args({ name: 'brind', type: () => String }) brind: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @GetAuthenticatedUser() req: any,
  ) {
    ///Check if student exists
    const student = await this.prismaService.student.findUnique({
      where: {
        brind: brind,
      },
    });

    ///If not throw error
    if (!student) {
      throw new Error('ER001');
    }

    ///Verify password
    const valid = await argon2.verify(student.password, password);
    if (!valid) {
      throw new Error('ER001');
    }

    ///Setting student session
    req.session!.studentID = student.id;

    return student;
  }

  @Query(() => Int)
  async sumESPP(@GetAuthenticatedUser() req: any): Promise<Number | null> {
    ///Calculating sum of espp
    const sum = await this.prismaService.subject.aggregate({
      _sum: {
        espp: true,
      },
      where: {
        exam: {
          examRecord: {
            studentID: req.session.studentID,
            passed: true,
            // singed: false,
          },
        },
      },
    });

    ///Validation
    if (!sum) {
      throw new Error('ER104');
    }
    return sum._sum.espp;
  }

  @Query(() => Float)
  async averageGrade(@GetAuthenticatedUser() req: any): Promise<Number | null> {
    ///Calculate average grade
    const avg = await this.prismaService.grade.aggregate({
      _avg: {
        value: true,
      },
      where: {
        exam: {
          exam: {
            examRecord: {
              studentID: req.session.studentID,
              passed: true,
              singed: false,
            },
          },
        },
      },
    });

    ///Validation
    if (!avg) {
      throw new Error('ER103');
    }

    return avg._avg.value;
  }

  @Mutation(() => Boolean)
  logout(@GetAuthenticatedUser() req: any) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        req.res.clearCookie('qid');
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Query(() => Student)
  // @UseGuards(isAuth)
  async me(@GetAuthenticatedUser() req: any): Promise<Student | null> {
    if (!req.session.studentID) {
      throw new Error('No ID');
    }
    console.log(req.session.studentID);

    return await this.prismaService.student.findUnique({
      where: {
        id: req.session.studentID,
      },
    });
  }

  @Mutation(() => Boolean)
  async registerExam(
    @GetAuthenticatedUser() req: any,
    @Args({ name: 'examID', type: () => String }) examID: string,
  ): Promise<Boolean> {
    let registeredExam;
    try {
      registeredExam = await this.prismaService.examRecord.create({
        data: {
          studentID: req.session.studentID,
          singed: true,
          examID,
        },
      });
    } catch (err) {
      console.log(err);
      if (err) return false;
    }
    return true;
  }

  @Query(() => [Student])
  async studentsForModul(
    @Args({ name: 'moduleName', type: () => String }) moduleName: string,
  ): Promise<Student[] | null> {
    ///Finding student from particular module
    const students = await this.prismaService.student.findMany({
      where: {
        modul: {
          moduleName,
        },
      },
    });

    ///Validation
    if (!students) {
      throw new Error('ER101');
    }
    return students;
  }

  @Query(() => [ExamRecord])
  // @UseMiddleware(isAuth)
  async passedExams(@GetAuthenticatedUser() req: any) {
    ///Passed exams for particular student
    const exams = await this.prismaService.examRecord.findMany({
      select: {
        exam: {
          select: {
            date: true,
            examinationPeriod: {
              select: {
                name: true,
              },
            },
            subject: {
              select: {
                subjectName: true,
                espp: true,
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
        grade: {
          select: {
            value: true,
          },
        },
        passed: true,
        points: true,
      },
      where: {
        studentID: req.session.studentID,
        passed: true,
        singed: false,
      },
    });

    ///Validate
    if (!exams) {
      throw new Error('ER105');
    }
    return exams;
  }

  @Query(() => [ExamRecord])
  // @UseMiddleware(isAuth)
  async registeredExams(@GetAuthenticatedUser() req: any) {
    ///Registered exams for particular student
    const exams = await this.prismaService.examRecord.findMany({
      where: {
        studentID: req.session.studentID,
        singed: true,
        passed: false,
      },
      select: {
        id: true,
        exam: {
          select: {
            id: true,
            date: true,
            subject: {
              select: {
                subjectName: true,
                type: true,
                espp: true,
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
      },
    });
    ///Validate
    ///Create error code fore this particular situation
    if (exams.length === 0) {
      throw new Error('You dont have any registered exams');
    }
    return exams;
  }

  @Mutation(() => Boolean)
  async deregisterExam(
    @Args({ name: 'examID', type: () => String }) examID: string,
    @GetAuthenticatedUser() req: any,
  ) {
    let registeredExam;

    ///Check if exam  is registered
    const result = await this.prismaService.examRecord.findFirst({
      where: {
        examID,
        studentID: req.session.studentID,
      },
    });
    if (!result) {
      throw new Error('ER401');
    }

    try {
      registeredExam = await this.prismaService.examRecord.delete({
        where: {
          id: result?.id,
        },
      });
    } catch (err) {
      console.log(err);
      if (err) return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async updateEmail(
    @Args({ name: 'email', type: () => String }) email: string,
    @GetAuthenticatedUser() req: any,
  ) {
    await this.prismaService.student.update({
      where: {
        id: req.session.studentID,
      },
      data: {
        email: email,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Args({ name: 'pass', type: () => String }) pass: string,
    @GetAuthenticatedUser() req: any,
  ) {
    const hashedPassword = await argon2.hash(pass);

    await this.prismaService.student.update({
      where: {
        id: req.session.studentID,
      },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  }
}
