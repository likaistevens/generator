import { EnumObject, TypeAliasType } from "../../../../utils/resolve/type";

export const getColumns = ({
  tableFieldKey,
  tableFieldObj,
  enumTypeObj,
  search,
}: {
  tableFieldKey: string;
  tableFieldObj: TypeAliasType;
  enumTypeObj: EnumObject;
  search: string[];
}) => {
  const start = `const columns: ProColumns<${tableFieldKey}>[] = [`;
  const end = `];`;
  const body: string[] = [];
  Object.values(tableFieldObj).forEach((item) => {
    const key = item.name;
    const type = item.type.split(".").pop() || "";
    const description = item.description || "";
    const baseColStr = `
        title: "${description || key}",
        dataIndex: "${key}",
        ${search.includes(key) ? "" : "search: false,"}
    `;
    if (type === "string" || type === "number") {
      // 以 time 结尾，则认为是时间戳，进行格式化
      if (type === "number" && key.toLowerCase().endsWith("time")) {
        body.push(`{
          ${baseColStr}
          valueType: 'dateTime',
        }`);
      } else {
        body.push(`{
          ${baseColStr}
        }`);
      }
      // 下拉选择
    } else if (enumTypeObj[type]) {
      // console.log(enumTypeObj, type);
      const valueEnumStr = Object.entries(enumTypeObj[type])
        .map(([enumKey, enumItemObject]) => {
          return `[${type}.${enumKey}]: {
                text: "${enumItemObject.description || enumKey}",
            }`;
        })
        .join(",");
      body.push(`{
        ${baseColStr}valueEnum: {
          ${valueEnumStr}
        },
      }`);
    }
  });
  return start + body.join().replaceAll("\n", "") + end;
};
