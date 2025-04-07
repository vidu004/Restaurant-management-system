import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  newsletterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  handleSubscribe() {
    if (this.newsletterForm.valid) {
      this.http
        .post('http://localhost:8080/newsletter/subscribe', this.newsletterForm.value)
        .subscribe(
          (response: any) => {
            this.snackbarService.openSnackBar(response.message, 'success');
            this.newsletterForm.reset();
          },
          (error: any) => {
            this.snackbarService.openSnackBar(
              error.error?.message || 'Error subscribing',
              'error'
            );
          }
        );
    } else {
      this.snackbarService.openSnackBar('Please enter a valid email!', 'error');
    }
  }
}
