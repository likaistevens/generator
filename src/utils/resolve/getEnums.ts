import { SourceFile } from "ts-morph";
import { EnumObject, EnumObjectType } from "./type";

export const getEnums = (sourceFile: SourceFile): EnumObject => {
  const enums = sourceFile.getEnums();
  const enumObject = {} as EnumObject;

  enums.forEach((e) => {
    const nodeName = e.getName();
    const enumMap: EnumObjectType = {};
    e.getMembers().forEach((member) => {
      const memberJSDocs = member.getJsDocs();
      const memberDescription =
        memberJSDocs.length > 0 ? memberJSDocs[0].getDescription().trim() : "";
      enumMap[member.getName() || ""] = {
        value: member.getValue(),
        ...(memberDescription ? { description: memberDescription } : {}),
      };
    });
    enumObject[nodeName] = enumMap;
  });

  return enumObject;
};
