import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Clipboard, ClipboardCheck, LucideAngularModule } from 'lucide-angular';
import { SkeletonAiService } from '../../services/skeletonAi.service';

@Component({
  imports: [
    CardModule,
    TextareaModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    LucideAngularModule,
  ],
  providers: [MessageService],
  selector: 'app-output-code',
  templateUrl: './output-code.component.html',
  styleUrls: ['./output-code.component.css'],
})
export class OutputCodeComponent {
  /**
   * Variable to store the skeleton code
   */
  skeletonCode: string = '';

  /**
   * Variable to store the copied status
   */
  isCopied = false;

  /**
   * Lucide icons
   */
  Clipboard = Clipboard;
  ClipboardCheck = ClipboardCheck;

  constructor(
    private skeletonAIService: SkeletonAiService,
    private messageService: MessageService
  ) {
    // Subscribe to the input code changes to get the skeleton code
    this.skeletonAIService.inputCode$.subscribe(
      (code) => (this.skeletonCode = code)
    );

    // Subscribe to the input code changes to reset the skeleton code
    this.skeletonAIService.inputCode$.subscribe((code) => {
      if (!code) {
        this.skeletonCode = '';
        this.isCopied = false;
      }
    });
  }

  /**
   * Method to copy the skeleton code to the clipboard
   */
  copyToClipboard() {
    // Check if there is no code to copy
    if (!this.skeletonCode) {
      // Reset the copied status
      this.isCopied = false;
      // Show a message if there is no code to copy
      this.messageService.add({
        severity: 'contrast',
        detail: 'No code to copy',
      });
      return;
    }

    // If there is code to copy, we copy it to the clipboard
    navigator.clipboard
      .writeText(this.skeletonCode)
      .then(() => {
        // Set the copied status to true
        this.isCopied = true;
        // Show a success message if the code was copied successfully
        this.messageService.add({
          severity: 'contrast',
          detail: 'Code copied to clipboard!',
        });
        // Reset the copied status after 2 seconds
        setTimeout(() => {
          // Reset the copied status
          this.isCopied = false;
        }, 2000);
      })
      // Show an error message if the code was not copied
      .catch((err) => {
        // Reset the copied status
        this.isCopied = false;
        this.messageService.add({
          severity: 'error',
          detail: `Failed to copy code + ${err}`,
        });
      });
  }
}
