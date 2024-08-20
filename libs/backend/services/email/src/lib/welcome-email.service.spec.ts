import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeEmailService } from './welcome-email.service';

// Mocked email transporter
const mockEmailTransporter = {
  transporter: {
    sendMail: jest.fn().mockResolvedValue({} as any), // Mocking the sendMail method
  },
  defaultFromEmail: 'test@example.com',
};

describe('WelcomeEmailService', () => {
  let service: WelcomeEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WelcomeEmailService,
        { provide: 'EMAIL_TRANSPORTER', useValue: mockEmailTransporter },
      ],
    }).compile();

    service = module.get<WelcomeEmailService>(WelcomeEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send welcome email', async () => {
    const email = 'recipient@example.com';
    await service.send(email);

    // Check if the sendMail method was called with the correct parameters
    expect(mockEmailTransporter.transporter.sendMail).toHaveBeenCalledWith({
      from: mockEmailTransporter.defaultFromEmail,
      to: email,
      subject: 'Welcome to Furahafy!',
      text: 'You have successfully created an account with Furahafy',
    });
  });
});
