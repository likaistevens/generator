import fs from "fs-extra";
import path from "path";
import { readFile } from "../utils/readFile";
import { resolveType } from "../utils/resolve/resolveType";
import { getColumns } from "./templates/ProTable/handler/getColumns";
import { getJsxStr } from "./templates/ProTable/handler/getJsxStr";
import { prettifyCode } from "../utils/prettifyCode";
import { loadConfig, sourceTypeFileName } from "../utils/loadConfig";

const cwd = process.cwd();
const templateDir = path.resolve(cwd, "./src/core/templates");
const pageIndexFileName = "index.tsx";

export const generate = async () => {
  const { source } = await loadConfig();
  // 暂时只支持一个 source
  const sourceFilePath = source[0];

  const { types, enums } = await resolveType(path.resolve(cwd, sourceFilePath));
  const importStr = await readFile(
    path.resolve(templateDir, "./ProTable/import.tsx")
  );
  const importTypeStr = `import { ${[
    ...Object.keys(types),
    ...Object.keys(enums),
  ].join(",")} } from "./type"`;

  const config = {
    pageName: "Note",
    headerTitle: "读书笔记列表",
    search: ["title", "auditStatus", "publishStatus"],
  };

  const columns = await getColumns({
    // TODO: 目前默认读取到的第一个type是 table 字段的类型
    tableFieldKey: Object.keys(types)[0],
    tableFieldObj: Object.values(types)[0],
    enumTypeObj: enums,
    search: config.search,
  });

  const jsxStr = getJsxStr({
    pageName: config.pageName,
    headerTitle: config.headerTitle,
    formTypeKey: Object.keys(types)[0],
  });

  const data = importStr + importTypeStr + "\n\n" + columns + "\n" + jsxStr;

  await fs.writeFile(
    path.resolve(
      cwd,
      sourceFilePath.endsWith(sourceTypeFileName)
        ? sourceFilePath.replace(`/${sourceTypeFileName}`, "")
        : sourceFilePath,
      pageIndexFileName
    ),
    prettifyCode(data, { parser: "typescript" })
  );
};

export default generate;
