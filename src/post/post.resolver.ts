import { Inject } from "@nestjs/common";
import { Resolver,Query, Args, Mutation } from "@nestjs/graphql";
import { GetAuthenticatedUser } from "src/decorators/student.decorator";
import { PrismaService } from "src/prisma.service";
import { PostInput } from "src/types/inputs/postInput.model";
import { Post } from "./post.model";

@Resolver(Post)
export class PostResolver {
constructor(@Inject(PrismaService) private prismaService: PrismaService){}
  @Query(() => [Post])
  async getAllPosts() {
    let posts = await this.prismaService.post.findMany({
        include:{
            creator:true
        }
    });
    return posts.reverse();
  }

  @Query(() => [Post])
  async getImportant() {
    let posts = await this.prismaService.post.findMany({
      where:{
        important:true
      },

        include:{
            creator:true
        }
    });
    return posts.reverse();
  }

  @Mutation(()=> Post)
  async createPost(
    @Args({ name: 'input', type: () => PostInput }) input: PostInput,
    @GetAuthenticatedUser() req: any,){
    let post;
    try {
      post = await this.prismaService.post.create({
        data: {
          creationDate:input.creationDate,
          text: input.text,
          creatorID: req.session.professorID,
          important: input.important
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error(' err');
    }
    return post;
  }
}