import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputCodeComponent } from './components/input-code/input-code.component';
import { OutputCodeComponent } from './components/output-code/output-code.component';
import { PrimeNG } from 'primeng/config';
import { PreviewCodeComponent } from './components/preview-code/preview-code.component';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ghost, LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { SkeletonService } from './services/skeleton.service';
import { MessageService } from 'primeng/api';

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
  ],
  providers: [SkeletonService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  Moon = Moon;
  Sun = Sun;
  Ghost = Ghost;
  title = 'Angular Ghost Frame';
  checked = false;

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
    this.primeng.ripple.set(true);

    const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode() {
    this.checked = !this.checked;
    const body = document.body; // Pega diretamente o body
    if (!body) return;

    const isDark = body.classList.toggle('dark-mode'); // Alterna a classe

    // Atualiza o localStorage
    localStorage.setItem('dark-mode', isDark.toString());
  }
}
