import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InstitutionRequestCreatedEvent } from '../events/institution-request-created.event';
import { InstitutionRequestUpdatedEvent } from '../events/institution-request-updated.event';
import { EmailService } from '@studiz/backend/email-service';
import { UserBackendService } from '@studiz/backend/user-service';
import { InstitutionBackendService } from '@studiz/backend/institution-service';
import { AuthServiceBackend } from '@studiz/backend/auth-service';

@Injectable()
export class InstitutionRequestModelEventsListener {
  frontendLink = process.env['STUDIZ_FRONTEND_URL'];
  frontendAppLink = process.env['STUDIZ_FRONTEND_APP_URL'];

  constructor(
    private emailService: EmailService,
    private userService: UserBackendService,
    private institutionService: InstitutionBackendService,
    private authService: AuthServiceBackend
  ) {
  }

  @OnEvent('institution-request.created')
  async sendWelcomeEmail($event: InstitutionRequestCreatedEvent) {
    if ($event.institutionRequest.adminEmail) {
      const mailOptions = {
        to: $event.institutionRequest.adminEmail,
        subject: 'Welcome to Studiz!',
        html: `
      <h1>Welcome to Studiz!</h1>
      <a href="${this.frontendLink}/get-started/${$event.institutionRequest.slug}">Continue Registration</a>
      `
      };
      await this.emailService.send(mailOptions);
    }
  }

  @OnEvent('institution-request.completed')
  async sendCompletedRegistrationEmail($event: InstitutionRequestUpdatedEvent) {
    const adminInfos = $event.institutionRequest.progressData?.adminInfos ?? [];

    const institution = await this.institutionService.create({
      name: $event.institutionRequest.progressData?.institutionInfo.name,
      logoFileUploadId: $event.institutionRequest.progressData?.institutionInfo.logoFileUpload?.id
    });
    for (let i = 0; i < Number(adminInfos.length); i++) {
      const adminInfo = adminInfos[i];
      try {
        if (adminInfo.email) {

          const user = await this.userService.create({
            email: adminInfo.email,
            firstName: adminInfo.firstName,
            lastName: adminInfo.lastName
          });

          const auth = await this.authService.login(user, '86400s');

          const mailOptions = {
            to: user.email,
            subject: 'Institution registration completed!',
            html: `
             <h1>Ready when you are!</h1>
              <a href="${this.frontendAppLink}?accessToken=${auth?.accessToken}">Continue to app</a>
              `
          };
          await this.emailService.send(mailOptions);
        }
      } catch (e: any) {
        console.error(e);
      }
    }
  }
}
