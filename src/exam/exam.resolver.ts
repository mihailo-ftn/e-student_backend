import { Inject } from "@nestjs/common";
import { Resolver,Query, Args } from "@nestjs/graphql";
import { PrismaService } from "src/prisma.service";
import { Exam } from "./exam.model";
import { ExamRecord } from "./examRecord.model";

@Resolver(Exam)
export class ExamResolver {
constructor(@Inject(PrismaService) private prismaService: PrismaService){}
  @Query(() => [ExamRecord])
  async getAllExams() {
    return await this.prismaService.examRecord.findMany({});
  }

  @Query(() => ExamRecord)
  async ExamRecordFromId(@Args({name:"id",type: () => String}) id: string) {
    return await this.prismaService.examRecord.findFirst({
      where: {
        id,
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
}
