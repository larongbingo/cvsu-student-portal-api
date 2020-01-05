import { Test, TestingModule } from '@nestjs/testing';
import { StudentPortalService } from './student-portal.service';

describe('StudentPortalService', () => {
  let service: StudentPortalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPortalService],
    }).compile();

    service = module.get<StudentPortalService>(StudentPortalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
