import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputCodeComponent } from './components/input-code/input-code.component';
import { OutputCodeComponent } from './components/output-code/output-code.component';
import { PreviewCodeComponent } from './components/preview-code/preview-code.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ExternalLink,
  Ghost,
  LucideAngularModule,
  Moon,
  Sun,
  Zap,
} from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { SkeletonAiService } from './services/skeletonAi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'root',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputCodeComponent,
    OutputCodeComponent,
    PreviewCodeComponent,
    TooltipModule,
    ToggleSwitchModule,
    LucideAngularModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [MessageService, SkeletonAiService, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          // Starts invisible
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          // Duration and easing
          '1.5s ease-in-out',
          style({
            // Ends visible
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  /**
   * Lucide Icons
   */
  Ghost = Ghost;
  Zap = Zap;
  External = ExternalLink;

  /**
   * App Title for the header
   */
  title = 'Angular Ghost Frame';

  constructor() {}

  ngOnInit() {}
}
