import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class PostInput {
  @Field(_type => Date, {
    nullable: false
  })
  creationDate!: Date;

  @Field(_type => Boolean, {
    nullable: true
  })
  important?: boolean;

  @Field(_type => String, {
    nullable: true
  })
  text?: string;
}