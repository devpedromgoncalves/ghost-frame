import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { Info, LucideAngularModule, Send } from 'lucide-angular';
import { SkeletonAiService } from '../../services/skeletonAi.service';
import { ToastModule } from 'primeng/toast';

@Component({
  imports: [
    CardModule,
    DialogModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    InputSwitchModule,
    ColorPickerModule,
    AccordionModule,
    DropdownModule,
    TooltipModule,
    ButtonModule,
    SelectModule,
    LucideAngularModule,
    ToastModule,
  ],
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.css'],
})
export class InputCodeComponent {
  /**
   * The input code to generate the skeleton from
   */
  inputCode: string = '';

  /**
   * Whether the skeleton is currently being generated
   */
  isLoading = false;

  /**
   * Whether the info modal is currently being shown
   */
  showInfoModal = false;

  /**
   * Lucide icons
   */
  Send = Send;
  Info = Info;

  constructor(private skeletonAIService: SkeletonAiService) {
    // Subscribe to the input code changes to reset the skeleton code
    this.skeletonAIService.inputCode$.subscribe((code) => {
      if (!code) {
        this.inputCode = '';
        this.isLoading = false;
      }
    });
  }

  /**
   * Update the input code when it changes in the input field
   */
  onCodeChange() {
    this.skeletonAIService.updateInputCode(this.inputCode);
  }

  /**
   * Generate the skeleton from the input code
   */
  generateSkeleton() {
    // Show the loading state while the skeleton is being generated
    this.isLoading = true;
    // Generate the skeleton from the input code
    this.skeletonAIService.generateSkeleton(this.inputCode).subscribe({
      // Handle the skeleton that was generated
      next: () => {
        // Resets the loading state
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        // Resets the loading state
        this.isLoading = false;
      },
    });
  }
}
