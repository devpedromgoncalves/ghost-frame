import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export interface SkeletonOptions {
  backgroundColor: string;
  animation: string;
  borderRadius?: string;
  preserveStructure: boolean;
  respectElementSizes: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SkeletonService {
  private inputCodeSubject = new BehaviorSubject<string>('');
  inputCode$ = this.inputCodeSubject.asObservable();

  constructor(private messageService: MessageService) {}

  // Opções padrão para o skeleton
  private defaultOptions: SkeletonOptions = {
    backgroundColor: '#D1D5DB',
    animation: 'animate-pulse',
    borderRadius: 'rounded-full',
    preserveStructure: true,
    respectElementSizes: true,
  };

  // Opções atuais
  private currentOptions: SkeletonOptions = { ...this.defaultOptions };

  updateInputCode(code: string) {
    this.inputCodeSubject.next(this.generateSkeleton(code));
  }

  setOptions(options: Partial<SkeletonOptions>) {
    this.currentOptions = { ...this.currentOptions, ...options };
    // Re-gerar o skeleton com as novas opções se já houver código
    const currentValue = this.inputCodeSubject.getValue();
    if (currentValue) {
      this.updateInputCode(currentValue);
    }
  }

  resetOptions() {
    this.currentOptions = { ...this.defaultOptions };
    // Re-gerar o skeleton com as opções padrão
    const currentValue = this.inputCodeSubject.getValue();
    if (currentValue) {
      this.updateInputCode(currentValue);
    }
  }

  // private generateSkeleton(html: string): string {
  //   if (!html.trim()) {
  //     return '';
  //   }

  //   // Para preservar espaçamento e estrutura
  //   if (this.currentOptions.preserveStructure) {
  //     // Regex que captura tags de abertura, incluindo self-closing tags
  //     const openTagRegex =
  //       /<([a-z][a-z0-9]*)((?:\s+[a-z0-9\-]+(?:=(?:"[^"]*"|'[^']*'|[^'">\s]+))?)*)\s*\/?>/gi;

  //     // Regex que captura tags de fechamento
  //     const closeTagRegex = /<\/([a-z][a-z0-9]*)\s*>/gi;

  //     // Adiciona classes ao skeleton em tags de abertura
  //     const modifiedHtml = html.replace(
  //       openTagRegex,
  //       (match, tagName, attributes) => {
  //         // Combine todas as classes Tailwind que queremos adicionar
  //         let tailwindClasses = [
  //           this.currentOptions.backgroundColor,
  //           this.currentOptions.animation,
  //         ];

  //         if (this.currentOptions.borderRadius) {
  //           tailwindClasses.push(this.currentOptions.borderRadius);
  //         }

  //         const classesString = tailwindClasses.join(' ');

  //         // Verifica se já existe um atributo class
  //         if (attributes && attributes.includes('class="')) {
  //           // Adiciona nossas classes ao atributo class existente
  //           return match.replace(
  //             /class="([^"]*)"/i,
  //             `class="$1 ${classesString}"`
  //           );
  //         } else {
  //           // Adiciona novo atributo class
  //           const closingBracket = match.endsWith('/>') ? '' : '';
  //           return `<${tagName}${
  //             attributes || ''
  //           } class="${classesString}"${closingBracket}>`;
  //         }
  //       }
  //     );

  //     return modifiedHtml;
  //   } else {
  //     // Versão simples sem preservação de estrutura
  //     return html.replace(/<([a-z]+)(.*?)>/gi, (match, tagName, attributes) => {
  //       // Combine todas as classes Tailwind
  //       let tailwindClasses = [
  //         this.currentOptions.backgroundColor,
  //         this.currentOptions.animation,
  //         this.currentOptions.borderRadius,
  //       ];

  //       if (this.currentOptions.borderRadius) {
  //         tailwindClasses.push(this.currentOptions.borderRadius);
  //       }

  //       const classesString = tailwindClasses.join(' ');

  //       return `<${tagName} class="${classesString}"${attributes}>`;
  //     });
  //   }
  // }

  private generateSkeleton(html: string): string {
    if (!html.trim()) {
      return '';
    }
    
    // Para preservar espaçamento e estrutura
    if (this.currentOptions.preserveStructure) {
      // Regex que captura tags de abertura, incluindo self-closing tags
      const openTagRegex =
        /<([a-z][a-z0-9]*)((?:\s+[a-z0-9\-]+(?:=(?:"[^"]*"|'[^']*'|[^'">\s]+))?)*)\s*\/?>/gi;

      // Regex que captura tags de fechamento
      const closeTagRegex = /<\/([a-z][a-z0-9]*)\s*>/gi;

      // Adiciona classes ao skeleton em tags de abertura
      const modifiedHtml = html.replace(
        openTagRegex,
        (match, tagName, attributes) => {
          // Combine todas as classes Tailwind que queremos adicionar
          let tailwindClasses = [
            this.currentOptions.animation, // Apenas a animação é uma classe Tailwind
          ];

          if (this.currentOptions.borderRadius) {
            tailwindClasses.push(this.currentOptions.borderRadius);
          }

          const classesString = tailwindClasses.join(' ');

          // Verifica se já existe um atributo class
          if (attributes && attributes.includes('class="')) {
            // Adiciona nossas classes ao atributo class existente
            return match.replace(
              /class="([^"]*)"/i,
              `class="$1 ${classesString}" style="background-color: ${this.currentOptions.backgroundColor}"`
            );
          } else {
            // Adiciona novo atributo class e estilo inline
            const closingBracket = match.endsWith('/>') ? '' : '';
            return `<${tagName}${
              attributes || ''
            } class="${classesString}" style="background-color: ${
              this.currentOptions.backgroundColor
            }"${closingBracket}>`;
          }
        }
      );

      return modifiedHtml;
    } else {
      // Versão simples sem preservação de estrutura
      return html.replace(/<([a-z]+)(.*?)>/gi, (match, tagName, attributes) => {
        // Combine todas as classes Tailwind
        let tailwindClasses = [
          this.currentOptions.animation,
          this.currentOptions.borderRadius,
        ];

        const classesString = tailwindClasses.join(' ');

        return `<${tagName} class="${classesString}" style="background-color: ${this.currentOptions.backgroundColor}"${attributes}>`;
      });
    }
  }
}
