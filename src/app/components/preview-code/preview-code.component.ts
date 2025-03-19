import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SkeletonAiService } from '../../services/skeletonAi.service';
import { ToastModule } from 'primeng/toast';
import { LucideAngularModule, Maximize2, RotateCcw } from 'lucide-angular';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  imports: [
    CommonModule,
    ToastModule,
    LucideAngularModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
  ],
  selector: 'app-preview-code',
  templateUrl: './preview-code.component.html',
  styleUrls: ['./preview-code.component.css'],
})
export class PreviewCodeComponent {
  /**
   * The input code to generate the skeleton from
   */
  inputCode: SafeHtml = '';

  /**
   * Whether the skeleton dialog is currently being shown
   */
  showSkeletonDialog = false;

  /**
   * Whether the skeleton is currently being generated
   */
  skeletonLoading = false;

  /**
   * Lucide Icons
   */
  Maximize = Maximize2;
  RotateCCW = RotateCcw;

  constructor(
    private skeletonAiService: SkeletonAiService,
    private sanitizer: DomSanitizer
  ) {
    // Subscribe to the input code changes
    this.skeletonAiService.inputCode$.subscribe((skeleton) => {
      // If there is a skeleton, update the input code using the sanitizer
      if (skeleton) {
        this.inputCode = this.sanitizer.bypassSecurityTrustHtml(skeleton);
      }
    });
  }

  resetSkeleton() {
    this.skeletonLoading = true;

    setTimeout(() => {
      this.skeletonAiService.clearSkeleton();
      this.inputCode = '';
      this.skeletonLoading = false;
    }, 1000);
  }
}
