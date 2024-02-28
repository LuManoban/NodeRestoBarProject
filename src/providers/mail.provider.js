import { createTransport } from "nodemailer";
import path from "path";
import { readFileSync } from "fs";
import { compile } from "handlebars";

class MailServer {
  constructor() {
    this.host = process.env.MAIL_SERVER;
    this.port = process.env.MAIL_PORT;
    this.tls = process.env.MAIL_USE_TLS;
    this.username = process.env.MAIL_USERNAME;
    this.password = process.env.MAIL_PASSWORD;

    // https://nodemailer.com/smtp/
    this.client = createTransport({
      service: "gmail",
      auth: {
        user: this.username,
        pass: this.password,
      },
    });
  }

  async send(to, subject, body) {
    return this.client.sendMail({
      from: this.username,
      to,
      subject,
      html: body,
    });
  }

  async resetPassword(name, email, password) {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "reset_password.html"
    );
    const source = readFileSync(templatePath, "utf-8");
    const template = compile(source);
    const html = template({ name, password });
    await this.send(email, "Nueva contraseña", html);
  }
}

export default new MailServer();
