import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatTableModule,MatSlideToggleModule,MatTooltipModule,FlexLayoutModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit{


  displayedColumns: string[] = ['name','email','contactNumber','status'];
  dataSource:any;
  responseMessage:any;

  constructor(private ngxService:NgxUiLoaderService,
    private userService:UserService,
    private snackbarService:SnackbarService){}

  ngOnInit(): void {
   this.ngxService.start();
   this.tableData();
  }

  tableData(){
  this.userService.getUsers().subscribe((reponse:any)=>{
    this.ngxService.stop();
    this.dataSource = new MatTableDataSource(reponse);
  },(error:any)=>{
    this.ngxService.stop();
   if(error.error?.message){
    this.responseMessage = error.error?.message;
   }
   else{
    this.responseMessage = GlobalConstants.genericError;
   }
   this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status:any,id:any){
    this.ngxService.start();
    var data={
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"Success");
      
    },(error:any)=>{
      this.ngxService.stop();
   if(error.error?.message){
    this.responseMessage = error.error?.message;
   }
   else{
    this.responseMessage = GlobalConstants.genericError;
   }
   this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
