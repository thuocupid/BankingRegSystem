import { TestBed } from '@angular/core/testing';

import { BankClientService } from './bank-client.service';

describe('BankClientService', () => {
  let service: BankClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
