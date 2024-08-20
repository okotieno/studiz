import { Inject, Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class WelcomeEmailService {

  frontendLink = process.env['STUDIZ_FRONTEND_URL'];

  constructor(
    @Inject('EMAIL_TRANSPORTER') private emailTransporter: { transporter:  Mail<SMTPTransport.SentMessageInfo>, defaultFromEmail: string }
  ) {
  }

  async send({ to, slug }:{ to: string, slug: string }): Promise<void> {
    // Define email content
    const mailOptions = {
      from: this.emailTransporter.defaultFromEmail,
      to,
      subject: 'Welcome to Studiz!',
      html: `
      <h1>Welcome to Studiz!</h1>
      <a href="${this.frontendLink}/get-started/${slug}">Continue Registration</a>
      `
    };

    // Send email
    await this.emailTransporter.transporter.sendMail(mailOptions);
  }
}
