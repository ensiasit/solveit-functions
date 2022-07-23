import { Storage } from "@google-cloud/storage";
import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { readJsonFileContent } from "./util/file.helper";
import { ProblemDto } from "./util/models";
import { setCors } from "./util/cors.helper";

const listProblems: HttpFunction = async (req: Request, res: Response) => {
  const shouldReturn = setCors(req, res);

  if (shouldReturn) {
    return;
  }

  const storage = new Storage();
  const bucket = storage.bucket("solveit-problems");
  const [files] = await bucket.getFiles();

  const problems: ProblemDto[] = await Promise.all(
    files.map(async (file) => readJsonFileContent<ProblemDto>(file)),
  );

  res.json(problems);
};

export default listProblems;
