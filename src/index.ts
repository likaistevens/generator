import fs from "fs-extra";
import http from "http";
import fetch, { RequestInit } from "node-fetch";
import * as OpenAPI from "openapi-typescript-codegen";
import dotenv from "dotenv";
import { getConfigPath } from "./utils/getConfigPath";
// import { loadConfigFile } from "./utils/loadConfigFile";
// import { TemplateType } from "./type";
import path from "path";
// import bondConfig from "../bond.config.js";
import { readFile } from "./utils/readFile";
import { resolveType } from "./utils/resolveType";
import { getColumns } from "./utils/getColumns";
import { getJsxStr } from "./utils/getJsxStr";
import { prettifyCode } from "./utils/prettifyCode";

const cwd = process.cwd();

const run = async () => {
  const importStr = await readFile(
    path.resolve(cwd, "./src/templates/ProTable/import.tsx")
  );

  const { formFieldTypeList, enumTypeObj, formTypeKey } = await resolveType(
    path.resolve(cwd, "./src/type.ts")
  );
  // console.log(formTypeKey, enumTypeObj);

  const config = {
    pageName: "Note",
    headerTitle: "读书笔记列表",
    search: ["title", "auditStatus", "publishStatus"],
  };

  const columns = await getColumns({
    formTypeKey,
    formFieldTypeList,
    enumTypeObj,
    search: config.search,
  });

  // console.log(columns);
  const jsxStr = getJsxStr({
    pageName: config.pageName,
    headerTitle: config.headerTitle,
    formTypeKey,
  });

  const typeStr = await readFile(path.resolve(cwd, "./src/type.ts"));

  const data = importStr + "\n" + typeStr + "\n" + columns + "\n" + jsxStr;
  // console.log(data);
  await fs.writeFile(
    path.resolve(
      cwd,
      "../front-admin-external/src/pages/Edit/NoteTest/index.tsx"
    ),
    prettifyCode(data, { parser: "typescript" })
  );
};

run();

export default run;
// ^export type [a-zA-Z]+ = \{[.]+\}$
