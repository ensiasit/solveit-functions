import { Storage } from "@google-cloud/storage";
import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { setCors } from "../util/cors.helper";

const publishProblem: HttpFunction = async (req: Request, res: Response) => {
  const shouldReturn = setCors(req, res);

  if (shouldReturn) {
    return;
  }

  const storage = new Storage();
  const bucket = storage.bucket("solveit-problems");
  const problem = req.body;
  const file = bucket.file(`${problem.slug}.json`);

  const [fileExists] = await file.exists();
  if (fileExists) {
    res
      .status(400)
      .json({ message: "A problem with the same name already exists." });

    return;
  }

  problem.metadata.createdAt = Number(new Date());

  await file.save(JSON.stringify(problem), {
    contentType: "application/json",
  });

  res.json({ message: "Problem uploaded." });
};

export default publishProblem;
