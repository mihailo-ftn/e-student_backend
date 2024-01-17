import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { GetAuthenticatedUser } from 'src/decorators/student.decorator';
import { PrismaService } from 'src/prisma.service';
import { SubjectInput } from 'src/types/inputs/subjectInput.model';
import { Subject } from './subject.model';

@Resolver(Subject)
export class SubjectResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Subject])
  async getSubjects() {
    return await this.prismaService.subject.findMany();
  }

  @Query(() => Subject)
  async getSubject(@Args({ name: 'id', type: () => String }) id: string) {
    
    const subject =  await this.prismaService.subject.findUnique({
      where: {
        id: id,
      },
    });
    console.log(subject)
    return subject;
  }

  @Mutation(() => Subject)
  async createSubject(
    @Args({ name: 'input', type: () => SubjectInput }) input: SubjectInput,
  ) {
    let subject;
    try {
      subject = await this.prismaService.subject.create({
        data: {
          subjectName: input.subjectName,
          espp: input.espp,
          type: input.type,
          professorID: input.professorID,
          modulID: input.modulID,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
    return subject;
  }

  @Query(() => [Subject])
  async subjectsForParticularModule(
    @Args({ name: 'moduleName', type: () => String }) moduleName: string,
  ): Promise<Subject[] | null> {
    return await this.prismaService.subject.findMany({
      where: {
        modul: {
          moduleName,
        },
      },
    });
  }

  @Query(() => [Subject])
  //   @UseMiddleware(isAuth)
  async studentsSubjects(
    @GetAuthenticatedUser() req: any,
  ): Promise<Subject[] | null> {
    ///Find student with ID from session then search for subjects with modulID
    const student = await this.prismaService.student.findUnique({
      where: {
        id: req.session.studentID,
      },
    });

    const subjects = await this.prismaService.subject.findMany({
      where: {
        modulID: student?.modulID,
      },
    });
    ///Validate
    if (!subjects) {
      throw new Error('ER501');
    }
    return subjects;
  }
}
