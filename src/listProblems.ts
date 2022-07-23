import { File, Storage } from "@google-cloud/storage";
import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

export interface ProblemDto {
  name: string;
  slug: string;
  description: string;
  text: string;
  tags: string[];
  setter: string;
  metadata?: any;
}

const readJsonFileContent = (file: File, problems: ProblemDto[]) => {
  const readStream = file.createReadStream();
  let content = "";

  readStream.on("data", (data) => {
    content += data.toString();
  });

  readStream.on("end", () => {
    problems.push(JSON.parse(content));
  });
};

const listProblems: HttpFunction = async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET,POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).send("");
    return;
  }

  const storage = new Storage();
  const bucket = storage.bucket("solveit-problems");
  const files = await bucket.getFiles();
  const problems: ProblemDto[] = [];

  files[0].forEach((file) => readJsonFileContent(file, problems));

  const intervalId = setInterval(() => {
    if (problems.length === files[0].length) {
      clearInterval(intervalId);
      res.json(problems);
    }
  }, 100);
};

export default listProblems;
