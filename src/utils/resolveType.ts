import { readFile } from "./readFile";
import fs from "fs";
import ts from "typescript";
import { Project } from "ts-morph";

export const resolveType = async (
  path: string
): Promise<{
  formFieldTypeList: string[];
  formTypeKey: string;
  enumTypeObj: Record<string, Object>;
}> => {
  const file = await readFile(path);
  //   const typeStrList = file
  //     .split("export ")
  //     .map((x) => x.replace("/n", ""))
  //     .filter((x) => !!x);
  const typeStrList = file
    .split("\n\n")
    .map((x) => x.replaceAll("\n", "").trim().replace(/;$/g, ""));
  //   const typeRegex = /export type ([a-zA-Z]+) = (\{.+\})/;
  //   const enumRegex = /export enum ([a-zA-Z]+) (\{.+\})/;
  const regex = /export (type|enum) ([a-zA-Z]+) (=|\s)*(\{.+\})/;

  const entriesList = typeStrList.map((x) => {
    const matches = regex.exec(x);
    // console.log(matches);
    if (matches) {
      const key = matches[2];
      const value = matches[4].replaceAll(";", ",").replaceAll("?", "");
      //   return [key, eval("(" + value + ")")];
      return [key, value];
    }
    return [];
  });
  const typesStrObj: Record<string, string> = Object.fromEntries(entriesList);

  const formTypeEntries = Object.entries(typesStrObj).find(([key, value]) => {
    return !value.includes("=");
  });
  const formTypeValue = formTypeEntries?.[1];
  const formTypeKey = formTypeEntries?.[0] || "";
  const formFieldTypeList =
    formTypeValue
      ?.replaceAll("{", "")
      .replaceAll("}", "")
      .split(",")
      .map((x) => x.trim())
      .filter((x) => !!x) || [];

  const enumTypeEntries = Object.entries(typesStrObj).filter(([key, value]) => {
    return value?.includes("=");
  });
  const enumTypeObj = Object.fromEntries(
    enumTypeEntries.map((x) => [x[0], eval(`(${x[1].replaceAll("=", ":")})`)])
  );
  console.log({ formFieldTypeList, enumTypeObj, formTypeKey });
  return { formFieldTypeList, enumTypeObj, formTypeKey };
  //   console.log(Object.fromEntries(entriesList));
  //   fs.writeFile("./test.js", typeStrList[1], (err) => {});
  //   console.log(file.replace("/n", ""), typeStrList.length);
};
