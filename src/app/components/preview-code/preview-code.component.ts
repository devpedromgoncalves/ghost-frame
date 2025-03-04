import { Component } from '@angular/core';
import { SkeletonService } from '../../services/skeleton.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-preview-code',
  templateUrl: './preview-code.component.html',
  styleUrls: ['./preview-code.component.css'],
})
export class PreviewCodeComponent {
  inputCode: SafeHtml = '';
  hasContent: boolean = false;

  constructor(
    private skeletonService: SkeletonService,
    private sanitizer: DomSanitizer
  ) {
    this.skeletonService.inputCode$.subscribe((skeleton) => {
      this.hasContent = !!skeleton.trim(); // Verifica se há conteúdo no código
      this.inputCode = this.sanitizer.bypassSecurityTrustHtml(
        this.modifySkeleton(skeleton)
      );
    });
  }

  // Função para modificar o conteúdo do skeleton e esconder o conteúdo real
  modifySkeleton(html: string): string {
    if (!html.trim()) {
      return html; // Caso o código esteja vazio, retorna o conteúdo original
    }

    // Aqui vamos remover o conteúdo real dentro das tags, mas manter a estrutura da tag HTML
    return html.replace(
      /(<[^>]+>)([^<]*)(<\/[^>]+>)/g,
      (match, openingTag, content, closingTag) => {
        // Se o conteúdo estiver vazio ou for apenas espaços em branco, ocultamos ele
        if (!content.trim()) {
          return `${openingTag}<!-- Skeleton Rendered -->${closingTag}`;
        }
        return match;
      }
    );
  }
}
