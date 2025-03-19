/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SkeletonAiService } from './skeletonAi.service';

describe('Service: SkeletonAI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkeletonAiService]
    });
  });

  it('should ...', inject([SkeletonAiService], (service: SkeletonAiService) => {
    expect(service).toBeTruthy();
  }));
});
