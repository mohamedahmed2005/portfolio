import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactFormModel } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private contactService = inject(ContactService);

  formData: ContactFormModel = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.errorMessage.set('Please fill out all required fields (Name, Email, Message).');
      return;
    }

    this.isSubmitting.set(true);

    this.contactService.sendMessage(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.successMessage.set(res.message);
        // Reset form
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message || 'Failed to send message. Please try again later.');
      }
    });
  }
}
