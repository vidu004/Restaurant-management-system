import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationComponent } from '../../../material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../../../material-component/dialog/change-password/change-password.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatDialogModule, RouterModule,MatMenuModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  role: any;
  constructor(private router:Router,
    private dialog: MatDialog){

  }
  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      message: 'Logout'
    };
    const dialogRef= this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '550px';
    this.dialog.open(ChangePasswordComponent,dialogConfig);
  }

}
