import { Test, TestingModule } from '@nestjs/testing';
import { MedicalObservationService } from './medical-observation.service';

describe('MedicalObservationService', () => {
  let service: MedicalObservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalObservationService],
    }).compile();

    service = module.get<MedicalObservationService>(MedicalObservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
