import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import the module
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, CommonModule], // Use MatSnackBarModule here
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'], // Fix typo: styleUrl -> styleUrls
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  handleSendMessage() {
    if (this.contactForm.valid) {
      this.http
        .post('http://localhost:8080/message/send', this.contactForm.value)
        .subscribe(
          (response: any) => {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
            this.contactForm.reset();
          },
          (error: any) => {
            this.snackBar.open(
              error.error?.message || 'Something went wrong!',
              'Close',
              { duration: 3000 }
            );
          }
        );
    } else {
      this.snackBar.open('Please fill all the fields correctly!', 'Close', {
        duration: 3000,
      });
    }
  }
}