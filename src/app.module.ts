import { ExaminationPeriodModule } from './examinationPeriod/examinationperiod.module';
import { ExamModule } from './exam/exam.module';
import { GradeModule } from './grade/grade.module';
import { ProfessorModule } from './professor/professor.module';
import { SubjectModule } from './subject/subject.module';
import { ModulModule } from './modul/modul.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostModule } from './post/post.module';
import { AdminModule } from './admin/admin.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      debug: false,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ExaminationPeriodModule,
    ExamModule,
    GradeModule,
    ProfessorModule,
    AdminModule,
    SubjectModule,
    ModulModule,
    ClassModule,
    StudentModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
