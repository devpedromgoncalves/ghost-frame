import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SkeletonService,
  SkeletonOptions,
} from '../../services/skeleton.service';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  imports: [
    CardModule,
    TextareaModule,
    IftaLabelModule,
    FormsModule,
    CommonModule,
    InputSwitchModule,
    ColorPickerModule,
    AccordionModule,
    DropdownModule,
    ButtonModule,
    CascadeSelectModule,
    LucideAngularModule,
  ],
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.css'],
})
export class InputCodeComponent {
  @Input() inputCode: string = '';

  showOptions: boolean = false;

  ChevronDown = ChevronDown;
  ChevronUp = ChevronUp;

  // Opções do skeleton
  backgroundColor = '#D1D5DB';
  animation = 'animate-pulse';
  preserveStructure = true;
  respectElementSizes = true;
  borderRadius = 'rounded-full';

  // Lista de animações disponíveis
  animations = [
    { label: 'Pulse', value: 'animate-pulse' },
    { label: 'Bounce', value: 'animate-bounce' },
    { label: 'None', value: '' },
  ];

  // Border radius Tailwind disponíveis
  borderRadiusOptions = [
    { label: 'None', value: '' },
    { label: 'Small (rounded)', value: 'rounded' },
    { label: 'Medium (rounded-md)', value: 'rounded-md' },
    { label: 'Large (rounded-lg)', value: 'rounded-lg' },
    { label: 'Full (rounded-full)', value: 'rounded-full' },
  ];

  constructor(private skeletonService: SkeletonService) {}

  onCodeChange() {
    this.skeletonService.updateInputCode(this.inputCode);
  }

  applyOptions() {
    const options: Partial<SkeletonOptions> = {
      backgroundColor: this.backgroundColor,
      animation: this.animation,
      preserveStructure: this.preserveStructure,
      respectElementSizes: this.respectElementSizes,
      borderRadius: this.borderRadius,
    };

    this.skeletonService.setOptions(options);
    this.onCodeChange(); // Re-gerar o skeleton com as novas opções
  }

  resetOptions() {
    this.backgroundColor = '#D1D5DB';
    this.animation = 'animate-pulse';
    this.preserveStructure = true;
    this.respectElementSizes = true;
    this.borderRadius = '';

    this.skeletonService.resetOptions();
    this.onCodeChange(); // Re-gerar o skeleton com as opções padrão
  }
}
