import { registerEnumType } from "@nestjs/graphql";


export enum Role {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    PROFESSOR = "PROFESSOR"
  }
  registerEnumType(Role, {
    name: "Role",
    description: undefined,
  });