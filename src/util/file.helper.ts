import { File } from "@google-cloud/storage";

export const readJsonFileContent = <T>(file: File) => {
  return new Promise<T>((resolve, reject) => {
    const readStream = file.createReadStream();
    let content = "";

    readStream
      .on("data", (data) => {
        content += data.toString();
      })
      .on("error", reject)
      .on("end", () => {
        resolve(JSON.parse(content));
      });
  });
};
