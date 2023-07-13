import chalk from "chalk";

export const message = {
  error: (msg: string) => {
    console.log(chalk.red(msg));
    process.exit();
  },
  warning: (msg: string) => {
    chalk.yellow(msg);
  },
};
