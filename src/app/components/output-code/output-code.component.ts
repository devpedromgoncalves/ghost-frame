import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { SkeletonService } from '../../services/skeleton.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Clipboard, ClipboardCheck, LucideAngularModule } from 'lucide-angular';

@Component({
  imports: [
    CardModule,
    TextareaModule,
    IftaLabelModule,
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
  skeletonCode: string = '';
  isCopied = false;

  Clipboard = Clipboard;
  ClipboardCheck = ClipboardCheck;

  constructor(
    private skeletonService: SkeletonService,
    private messageService: MessageService
  ) {
    this.skeletonService.inputCode$.subscribe(
      (code) => (this.skeletonCode = code)
    );
  }

  copyToClipboard() {
    if (!this.skeletonCode) {
      this.isCopied = false;
      this.messageService.add({
        severity: 'contrast',
        detail: 'No code to copy',
      });
      return;
    }

    navigator.clipboard
      .writeText(this.skeletonCode)
      .then(() => {
        this.isCopied = true;
        this.messageService.add({
          severity: 'contrast',
          detail: 'Code copied to clipboard!',
        });
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);
      })
      .catch((err) => {
        this.isCopied = false;
        this.messageService.add({
          severity: 'error',
          detail: `Failed to copy code + ${err}`,
        });
      });
  }
}
