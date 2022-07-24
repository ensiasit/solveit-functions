import { Storage } from "@google-cloud/storage";
import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { readJsonFileContent } from "../util/file.helper";
import { setCors } from "../util/cors.helper";

const subscribeUser: HttpFunction = async (req: Request, res: Response) => {
  const shouldReturn = setCors(req, res);

  if (shouldReturn) {
    return;
  }

  const storage = new Storage();
  const bucket = storage.bucket("solveit-users");
  const file = bucket.file("emails.json");
  const { email } = req.body;

  const emails = await readJsonFileContent<string[]>(file);

  if (emails.find((arrayEmail: string) => arrayEmail === email)) {
    res.status(400).json({ message: "The user is already subscribed." });
    return;
  }

  emails.push(email);

  await file.save(JSON.stringify(emails), {
    contentType: "application/json",
  });

  res.json({ message: "The user is subscribed." });
};

export default subscribeUser;
