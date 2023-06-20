export const getColumns = ({
  formTypeKey,
  formFieldTypeList,
  enumTypeObj,
  search,
}: {
  formTypeKey: string;
  formFieldTypeList: string[];
  enumTypeObj: Record<string, object>;
  search: string[];
}) => {
  const start = `const columns: ProColumns<${formTypeKey}>[] = [`;
  const end = `];`;
  const body: string[] = [];
  formFieldTypeList.forEach((item) => {
    const [key, type] = item.replaceAll(" ", "").split(":");
    if (type === "string" || type === "number") {
      body.push(`{
            title: "${key}",
            dataIndex: "${key}",
            ${search.includes(key) ? "" : "search: false"}
        }`);
    } else if (enumTypeObj[type]) {
      const valueEnumStr = Object.entries(enumTypeObj[type]).map(
        ([key, value]) => {
          return `${value}: {
                text: "${key}",
            }`;
        }
      );
      body.push(`{
            title: "${key}",
            dataIndex: "${key}",
            valueEnum: {
                ${valueEnumStr.join(",")}
              },
            ${search.includes(key) ? "" : "search: false"}
        }`);
    }
  });
  return start + body.join() + end;
};
