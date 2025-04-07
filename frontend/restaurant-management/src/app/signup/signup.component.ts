import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
//import { group } from 'console';
import { GlobalConstants } from '../shared/global-constants';
//import { response } from 'express';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,CommonModule,MatDialogModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,FlexLayoutModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});
  
  responseMessage:string = '';

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
  name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
  email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
  contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
  password:[null,[Validators.required]],
    })
  }

handleSubmit(){
  this.ngxService.start();
  var formData = this.signupForm.value;
  var data = {
    name:formData.name,
    email:formData.email,
    contactNumber:formData.contactNumber,
    password:formData.password
  }

  this.userService.signup(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.dialogRef.close();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackBar(this.responseMessage,"");
    this.router.navigate(['/']);
  },(error)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage= GlobalConstants.genericError;

    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);

  })

}

}
