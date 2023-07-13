import {
  InterfaceDeclaration,
  SourceFile,
  TypeAliasDeclaration,
  Node,
} from "ts-morph";
import { TypeAliasObject, TypeAliasType } from "./type";
import chalk from "chalk";

export const getType = (sourceFile: SourceFile): TypeAliasObject => {
  const typeAliasObject = {} as TypeAliasObject;

  const typeAliases = sourceFile.getTypeAliases();
  typeAliases.forEach((typeAlias) => {
    const nodeName = typeAlias.getName();
    const typeNode = typeAlias.getTypeNodeOrThrow();
    const typeAliasMap: TypeAliasType = {};
    // https://github.com/dsherret/ts-morph/issues/815#issuecomment-626265341
    if (Node.isTypeLiteral(typeNode)) {
      typeNode.getMembers().forEach((member) => {
        const description = member.getJsDocs()?.[0]?.getDescription();
        const name = member.getSymbol()?.getName();
        const type = member.getType().getText();
        if (name) {
          typeAliasMap[name] = {
            name,
            type,
            description,
          };
        } else {
          console.log(chalk.red(`Type alias ${name} has no name`));
        }
      });
      typeAliasObject[nodeName] = typeAliasMap;
    }
  });
  return typeAliasObject;
};
