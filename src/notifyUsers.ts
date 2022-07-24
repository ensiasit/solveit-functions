import nodemailer from "nodemailer";
import { Storage } from "@google-cloud/storage";
import { readJsonFileContent } from "./util/file.helper";

const sendEmails = async (emails: string[]) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "club.ensias.it.gcp@gmail.com",
      pass: "slltoblxeczgqkxr",
    },
  });

  return transporter.sendMail({
    from: '"ENSIAS IT Club" <club.ensias.it.gcp@gmail.com>',
    to: emails.join(","),
    subject: "New problem has been published",
    text: "New problem published.",
    html: "<b>New problem published.</b>",
  });
};

const notifyUsers = async () => {
  const storage = new Storage();
  const bucket = storage.bucket("solveit-users");
  const file = bucket.file("emails.json");
  const emails = await readJsonFileContent<string[]>(file);

  await sendEmails(emails);
};

export default notifyUsers;
