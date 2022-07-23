import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";

const subscribeUser: HttpFunction = (_req: Request, res: Response) => {
  res.json("ok");
};

export default subscribeUser;
