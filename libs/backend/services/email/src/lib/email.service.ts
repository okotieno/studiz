import { Inject, Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {

  constructor(
    @Inject('EMAIL_TRANSPORTER') private emailTransporter: { transporter:  Mail<SMTPTransport.SentMessageInfo>, defaultFromEmail: string }
  ) {
  }

  async send({ from, ...mailOptions }: Mail['options']): Promise<void> {
    await this.emailTransporter.transporter.sendMail({
      from: from ?? this.emailTransporter.defaultFromEmail,
      ...mailOptions,
    });
  }
}
