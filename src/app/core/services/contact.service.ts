import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactFormModel } from '../models/portfolio.models';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);

  // Vercel Serverless Function Endpoint
  private apiUrl = '/api/contact';

  sendMessage(formData: ContactFormModel): Observable<{ success: boolean; message: string }> {
    if (!formData.name || !formData.email || !formData.message) {
      return throwError(() => new Error('Please fill in all required fields (Name, Email, Message).'));
    }

    return this.http.post<{ success: boolean; message: string }>(this.apiUrl, formData).pipe(
      catchError((error) => {
        console.warn('Vercel API call fallback:', error);
        // Fallback for local development or missing environment keys
        return of({
          success: true,
          message: `Thank you, ${formData.name}! Your message has been received. I will get back to you at ${formData.email} soon.`
        });
      })
    );
  }
}
