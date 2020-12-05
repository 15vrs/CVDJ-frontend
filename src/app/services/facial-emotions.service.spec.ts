import { TestBed } from '@angular/core/testing';

import { FacialEmotionsService } from './facial-emotions.service';

describe('FacialEmotionsService', () => {
  let service: FacialEmotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacialEmotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
