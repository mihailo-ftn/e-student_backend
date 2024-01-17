import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Subject } from 'src/subject/subject.model';
import { ModulInput } from 'src/types/inputs/modulInput.model';
import { Modul } from './modul.model';

@Resolver(Modul)
export class ModulResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Modul])
  async getAllModuls(): Promise<Modul[] | null> {
    return await this.prismaService.modul.findMany();
  }

  @Mutation(() => Modul)
  async createModul(
    @Args({ name: 'input', type: () => ModulInput }) input: ModulInput,
  ): Promise<Modul | null> {
    let modul;
    try {
      modul = await this.prismaService.modul.create({
        data: {
          moduleCode: input.moduleCode,
          moduleName: input.moduleName,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error('err');
    }
    return modul;
  }

  @Query(() => [Subject])
  async modulSubjects(
    @Args({ name: 'id', type: () => String }) id: string,
  ): Promise<Subject[] | null> {
    return await this.prismaService.subject.findMany({
      where: {
        modulID: id,
      },
    });
  }
}
