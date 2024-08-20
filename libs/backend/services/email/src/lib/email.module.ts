import { Module } from '@nestjs/common';
import { WelcomeEmailService } from './welcome-email.service';
import { createTransport } from 'nodemailer';

@Module({
  controllers: [],
  providers: [
    WelcomeEmailService,
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
    WelcomeEmailService
  ],
})
export class EmailModule {
}
