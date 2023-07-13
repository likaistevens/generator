import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { GeneratorConfig } from "../../__type__";
import { message } from "./message";

const cwd = process.cwd();
const configFileExt = ["js", "cjs"];
const configFileName = "generator.config";
export const sourceTypeFileName = "type.ts";

export const loadConfig = async (): Promise<GeneratorConfig> => {
  const cwd = process.cwd();

  const configPaths = configFileExt.map((ext) =>
    path.resolve(cwd, `${configFileName}.${ext}`)
  );
  const configPath = configPaths.find((p) => fs.existsSync(p));

  if (!configPath) {
    console.log(chalk.red(`找不到 ${configFileName} 配置文件`));
    process.exit();
  }

  const urls: string[] = [];
  // TODO: 支持 esmodule （mjs）
  const userConfig = (await import(configPath)).default;

  validateConfig(userConfig);

  return userConfig;
};

const validateConfig = (config: GeneratorConfig) => {
  const { source } = config;

  if (source.length === 0) {
    message.error("缺少 source 文件路径");
  } else {
    source.map((item) => {
      if (!fs.existsSync(item)) {
        message.error(`${item} 路径不存在`);
      } else {
        const stat = fs.statSync(item);
        if (stat.isFile()) {
          if (!item.endsWith(sourceTypeFileName)) {
            message.error(`source 文件名必须为 ${sourceTypeFileName}`);
          }
        } else if (stat.isDirectory()) {
          if (!fs.existsSync(path.resolve(cwd, item, sourceTypeFileName))) {
            message.error(`${item} 目录下无 ${sourceTypeFileName} 文件`);
          }
        }
      }
    });
  }
};
