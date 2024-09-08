import { Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EmailService } from './email.service';

@Module({
  controllers: [],
  providers: [
    EmailService,
    {
      provide: 'EMAIL_TRANSPORTER',
      useValue: {
        defaultFromEmail: process.env['STUDIZ_MAIL_FROM'],
        transporter: createTransport({
          host: process.env['STUDIZ_MAIL_HOST'],
          port: Number(process.env['STUDIZ_MAIL_PORT']),
          auth: {
            user: process.env['STUDIZ_MAIL_USERNAME'],
            pass: process.env['STUDIZ_MAIL_PASSWORD'],
          }
        })
      }
    }
  ],
  exports: [
    EmailService
  ],
})
export class EmailModule {
}
