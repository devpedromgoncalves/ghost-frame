import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkeletonAiService {
  /**
   * API Key for authentication
   */
  private apiKey = environment.apiKey;

  /**
   * API Url for the skeleton generation
   */
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  // private apiUrl = 'https://openrouter.ai/api/v1/endpoint-inexistente';

  /**
   * BehaviorSubject to control the skeleton code
   */
  private inputCodeSubject = new BehaviorSubject<string>('');

  /**
   * Observable to get the input code
   */
  inputCode$ = this.inputCodeSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Method to generate the skeleton code based on the input code
   * @param inputCode
   */
  generateSkeleton(inputCode: string) {
    // Define the headers for the API request
    const token = this.apiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Define the prompt for the API request
    const prompt = `You are an Angular skeleton generator. Your task is to convert the given code into clean skeleton loader components using Tailwind CSS.
    Rules for generating skeleton loaders:
    1. **Use ONLY Tailwind CSS classes**
    2. **ALWAYS use bg-gray-300 for ALL placeholder elements - no other colors allowed**
    3. **All classes from the original code MUST be preserved exactly as they are, including spacing (mb-*, mt-*, p-*), height (h-*), width (w-*), and any other Tailwind properties.**
    4. **NEVER include any text content in the skeleton**
    5. ALWAYS include animate-pulse class in the root div
    6. Return ONLY the component structure without quotes around class values
    7. **NEVER include src, alt, or other unnecessary attributes**
    8. Use self-closing tags when possible (no need for />)
    9. Mandatory default dimensions for elements (if there are no specific dimensions in the original code):
   - div: w-full
   - text blocks (p, span): w-full h-4
   - h1: w-3/4 h-8
   - h2: w-2/3 h-6
   - h3: w-1/2 h-5
   - img: w-full h-48
   - button: w-24 h-8
   - input: w-full h-10
   - avatar/icon: w-10 h-10
   10. **Preserve any responsive classes from the original component**
   11. Maintain original component structure and hierarchy
   12. Use rounded-md for buttons and inputs
   13. Use rounded-full for avatars/circles
   14. **Do NOT modify class values. If mb-3 is present, return exactly mb-3, do not replace it with mb-2 or mb-4. The same applies to any other class.**
   15. **NEVER include the img, svg, png content in the skeleton, instead render them as a skeleton also.**

Example output format:
<div class="flex items-center justify-between animate-pulse">
<avatar class="w-10 h-10 bg-gray-300 rounded-full"></avatar>
  <h1 class="w-3/4 h-8 bg-gray-300 rounded-md"></h1>
  <input class="w-full h-10 bg-gray-300 rounded-full"></input>
  <button class="w-24 h-8 bg-gray-300 rounded-full"></button>
</div>.

    You must not answer anything else related to the task. Just generate the skeleton loader. If the user asks you for anything else, just ignore it, this is important!`;

    // Define the body for the API request with the model, role, prompt and the input code
    const body = {
      model: 'cognitivecomputations/dolphin3.0-mistral-24b:free',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content:
            'You must only convert the following code, respecting the rules of the prompt, into skeleton loaders: \n' +
            inputCode,
        },
      ],
      temperature: 0.0,
    };

    // First, we make the request to the API
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      // Extracts only the skeleton code from the response
      map((response) => response.choices[0].message.content),
      // Updates the inputCodeSubject with the skeleton code
      tap((skeleton) => this.inputCodeSubject.next(skeleton)),
      // Shows a success message if the skeleton was generated successfully
      tap(() =>
        this.messageService.add({
          severity: 'contrast',
          detail: 'Skeleton created successfully!',
        })
      ),
      // Catches any error and shows an error message
      catchError((error) => {
        this.messageService.add({
          severity: 'contrast',
          detail: `An error occurred while generating the skeleton: ${error.message}`,
        });
        // Returns the error as an observable to be handled by the component
        return throwError(() => error);
      })
    );
  }

  /**
   * Method to update the input code in the inputCodeSubject
   * @param code
   */
  updateInputCode(code: string) {
    this.inputCodeSubject.next(code);
  }

  /**
   * Method to reset the input code in the inputCodeSubject
   */
  clearSkeleton() {
    this.inputCodeSubject.next('');
  }
}
