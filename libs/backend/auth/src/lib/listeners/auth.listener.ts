import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoginLinkRequestEvent } from '../events/login-link-request.event';
import { EmailService } from '@studiz/backend/email-service';
import { UserBackendService } from '@studiz/backend/user-service';
import { AuthServiceBackend } from '@studiz/backend/auth-service';

@Injectable()
export class AuthEventsListener {
  frontendAppLink = process.env['STUDIZ_FRONTEND_APP_URL'];

  constructor(
    private emailService: EmailService,
    private userService: UserBackendService,
    private authService: AuthServiceBackend
  ) {
  }

  @OnEvent('login-link.request')
  async sendLoginLinkEmail($event: LoginLinkRequestEvent) {


    if ($event.email) {
      const user = await this.userService.findByEmail($event.email);
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }

      const auth = await this.authService.login(user, '300s');

      const mailOptions = {
        to: $event.email,
        subject: 'Login Request',
        html: `
             <h1>Login to studiz</h1>
              <a href="${this.frontendAppLink}?accessToken=${auth?.accessToken}">Continue to app</a>
              `
      };
      await this.emailService.send(mailOptions);
    }
  }

}
