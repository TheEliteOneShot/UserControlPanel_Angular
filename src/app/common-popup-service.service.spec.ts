import { TestBed } from '@angular/core/testing';

import { CommonPopupServiceService } from './common-popup-service.service';

describe('CommonPopupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonPopupServiceService = TestBed.get(CommonPopupServiceService);
    expect(service).toBeTruthy();
  });
});
