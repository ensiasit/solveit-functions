import { Request, Response } from "@google-cloud/functions-framework";

export const setCors = (req: Request, res: Response): boolean => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET,POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    res.status(204).send("");

    return true;
  }

  return false;
};
