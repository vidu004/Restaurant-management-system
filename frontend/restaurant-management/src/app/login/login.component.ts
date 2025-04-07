import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule, MatToolbarModule, CommonModule, MatDialogModule,
    ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    FlexLayoutModule, MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]]
    });
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        //this.dialogRef.close();

        if (!response?.token) {
          this.snackbarService.openSnackBar("Invalid login response", GlobalConstants.error);
          return;
        }

        localStorage.setItem('token', response.token);
        this.dialogRef.close();

        // ✅ Decode token to check user role
        const tokenPayload: any = jwtDecode(response.token);
        const userRole = tokenPayload?.role;

        if (userRole === 'admin' || userRole === 'user') {
          this.router.navigate(['/cafe/dashboard']);
        } else {
          this.snackbarService.openSnackBar("Unauthorized role", GlobalConstants.error);
          localStorage.clear();
        }
      },
      (error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
