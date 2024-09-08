import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

// Mocked email transporter
const mockEmailTransporter = {
  transporter: {
    sendMail: jest.fn().mockResolvedValue({} as any), // Mocking the sendMail method
  },
  defaultFromEmail: 'test@example.com',
};

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: 'EMAIL_TRANSPORTER', useValue: mockEmailTransporter },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send welcome email', async () => {
    const email = 'recipient@example.com';
    await service.send({
      to: email,
      from: mockEmailTransporter.defaultFromEmail,
      subject: 'Welcome to Studiz!',
      text: 'You have successfully created an account with Studiz',
    });

    // Check if the sendMail method was called with the correct parameters
    expect(mockEmailTransporter.transporter.sendMail).toHaveBeenCalledWith({
      from: mockEmailTransporter.defaultFromEmail,
      to: email,
      subject: 'Welcome to Studiz!',
      text: 'You have successfully created an account with Studiz',
    });
  });
});
