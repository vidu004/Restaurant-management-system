import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,CommonModule,MatDialogModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,FlexLayoutModule,MatButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{


  resetForm: FormGroup;
  resetToken: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resetToken = params['token']; // Get token from URL
    });
  }

  handleSubmit() {
    if (this.resetForm.value.newPassword !== this.resetForm.value.confirmPassword) {
      this.snackbarService.openSnackBar("Passwords do not match", "error");
      return;
    }

    const data = {
      resetToken: this.resetToken,
      newPassword: this.resetForm.value.newPassword
    };

    this.userService.resetPassword(data).subscribe(
      (response: any) => {
        this.snackbarService.openSnackBar(response.message, '');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackbarService.openSnackBar("Failed to reset password", "error");
      }
    );
  }
  


}
