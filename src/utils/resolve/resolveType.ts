import { readFile } from "../readFile";
import fs from "fs";
import ts from "typescript";
import { Project } from "ts-morph";
import { getEnums } from "./getEnums";
import { getType } from "./getType";
import { EnumObject, TypeAliasObject } from "./type";

export const resolveType = async (
  path: string
): Promise<{
  enums: EnumObject;
  types: TypeAliasObject;
}> => {
  const project = new Project();
  project.addSourceFilesAtPaths(path);
  const sourceFile = project.getSourceFileOrThrow(path);
  const enums = getEnums(sourceFile);
  const types = getType(sourceFile);
  // console.log(enums, types);

  return { types, enums };
};
