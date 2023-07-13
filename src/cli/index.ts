import fs from "fs-extra";
import path from "path";
import { program } from "commander";
import generate from "../core";

const cwd = process.cwd();

const pkg = fs.readJsonSync(path.join(cwd, "package.json"));

program.version(pkg.version, "-v, --version");

program.description("generates Typescript clients").action(async () => {
  await generate();
});

program.parse(process.argv);
