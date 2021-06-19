import { TestBed } from '@angular/core/testing';

import { PwaPushService } from './pwa-push.service';

describe('PwaPushService', () => {
  let service: PwaPushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaPushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
