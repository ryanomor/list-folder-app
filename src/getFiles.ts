import fs from "fs";
import util from "util";
import readline from "readline";

export const getFiles = async () => {
  const rl = readline.createInterface(process.stdin, process.stdout);
  const query =
    "This app prints the files and folders of a source folder\nPlease enter the root path of the folder\nor enter Y to exit: ";

  rl.setPrompt(query);
  rl.prompt();

  rl.on("line", (src: string) => {
    if (src.trim().toLowerCase() === "y") {
      rl.close();
    } else {
      try {
        listFiles(src.trim());
        setTimeout(() => callPrompt(rl), 1000);
      } catch (e) {
        callPrompt(rl, "err");
      }
    }
  });
};

const callPrompt = (readLine: any, err?: string) => {
  if (err === "err") {
    readLine.setPrompt(`Enter a a valid path or 'Y' to exit: `);
  } else {
    readLine.setPrompt(`Enter a path to a source folder or 'Y' to exit: `);
  }
  readLine.prompt();
};

export const listFiles = (path: any) => {
  const files = fs.readdirSync(path);
  const fsStat = util.promisify(fs.stat);
  let fileEntry = {};
  let totalSize = 0;
  let totalCount = 0;

  const arrayOfFiles: object[] = [];

  files
    .reduce((p: any, file: any) => {
      return p.then(() => {
        return fsStat(path + "/" + file).then((stats: any) => {
          const size: number = stats["size"];
          const lastModified = stats["mtime"];

          fileEntry = { file, size, lastModified };
          totalSize += size;
          totalCount++;

          arrayOfFiles.push(fileEntry);
        });
      });
    }, Promise.resolve())
    .then(() => {
      arrayOfFiles.sort((a: any, b: any) => a.size - b.size);
      console.log(
        arrayOfFiles.map(
          (file: any, i) =>
            `${i + 1}. ${path}/${file.file} is ${
              file.size
            } bytes and last modified ${file.lastModified}`
        )
      );
      console.log(`Total size: ${totalSize} bytes`);
      console.log(`Total count: ${totalCount} items`);
    });
};

const exportFunctions = {
  getFiles,
  listFiles,
};

export default exportFunctions;
