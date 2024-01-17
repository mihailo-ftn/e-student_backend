import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class ModulInput {
    @Field(_type => String, {
        nullable: false
      })
      moduleName!: string;
    
      @Field(_type => String, {
        nullable: false
      })
      moduleCode!: string;
    
}
