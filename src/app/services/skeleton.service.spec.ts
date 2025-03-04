/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SkeletonService } from './skeleton.service';

describe('Service: Skeleton', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkeletonService]
    });
  });

  it('should ...', inject([SkeletonService], (service: SkeletonService) => {
    expect(service).toBeTruthy();
  }));
});
