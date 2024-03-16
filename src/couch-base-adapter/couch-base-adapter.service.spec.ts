import { Test, TestingModule } from '@nestjs/testing';
import { CouchBaseAdapterService } from './couch-base-adapter.service';

describe('CouchBaseAdapterService', () => {
  let service: CouchBaseAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouchBaseAdapterService],
    }).compile();

    service = module.get<CouchBaseAdapterService>(CouchBaseAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
