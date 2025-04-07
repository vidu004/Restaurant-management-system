import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SignupComponent } from '../../signup/signup.component';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
import { LoginComponent } from '../../login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { BestSellerComponent } from '../../best-seller/best-seller/best-seller.component';
import { OurMealsComponent } from '../../our-meals/our-meals.component';
//import { ViewportScroller } from '@angular/common';
import { ContactComponent } from '../../contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsletterComponent } from '../../newsletter/newsletter.component';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BestSellerComponent,MatIconModule,OurMealsComponent,ContactComponent,CommonModule,NewsletterComponent,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private userService: UserService,
   // private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.checkToken().subscribe(
        (response: any) => {
          console.log("User is logged in. Staying on home page.");
          // 🚀 Do NOT redirect automatically to dashboard
        },
        (error) => {
          console.log("Invalid token, logging out user.");
          localStorage.clear(); // ✅ Clear invalid tokens
        }
      );
    }
  }

  /*scrollToContact() {
    this.viewportScroller.scrollToAnchor('contact');
  }*/

  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent, dialogConfig);
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
