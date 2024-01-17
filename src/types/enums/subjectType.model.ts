import { registerEnumType } from "@nestjs/graphql";


export enum SubjectType {
    REQUIRED = "REQUIRED",
    ELECTIVE = "ELECTIVE"
  }
  registerEnumType(SubjectType, {
    name: "SubjectType",
    description: undefined,
  });