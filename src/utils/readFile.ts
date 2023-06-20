import fs from "fs";

export const readFile = (path: string) => {
  return new Promise<string>((resolve, reject) => {
    // console.log("read " + path);
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      //   console.log(data);
      resolve(data);
    });
  });
};
