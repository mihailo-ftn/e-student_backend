import { Inject } from '@nestjs/common';
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { ClassInput } from 'src/types/inputs/classInput.model';
import { Class } from './class.model';

@Resolver(Class)
export class ClassResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => [Class])
  async getClasses() {
    return await this.prismaService.class.findMany();
  }

  @Mutation(() => Class)
  async createClass(
    @Args({ name: 'input', type: () => ClassInput }) input: ClassInput,
  ) {
    let classa;
    try {
      classa = await this.prismaService.class.create({
        data: {
          classLabel: input.classLabel,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error('Error');
    }
    return classa;
  }
}
