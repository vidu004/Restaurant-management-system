import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import {MatTableDataSource} from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from '../dialog/category/category.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [MatCardModule,MatTooltipModule,MatIconModule,MatTableModule,MatInputModule,MatFormFieldModule,MatButtonModule,CommonModule,ReactiveFormsModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit{


 displayedColumns: string[]= ['name', 'edit'];
 dataSource:any;
 responseMessage:any;

  constructor(private categoryService:CategoryService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbaService:SnackbarService,
    private router:Router){}

ngOnInit(): void{
    this.ngxService.start();
    this.tableData();

  }

tableData(){
  this.categoryService.getCategory().subscribe((response:any)=>{
  this.ngxService.stop();
  this.dataSource = new MatTableDataSource(response);
},(error:any)=>{
  this.ngxService.stop();
  if(error.error?.message){
    this.responseMessage = error.error?.message;
  }
  else{
    this.responseMessage = GlobalConstants.genericError;
  }
  this.snackbaService.openSnackBar(this.responseMessage,GlobalConstants.error);
})
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.data = {
      action:'Add'
    }
    dialogConfig.width= "850px";
    const dialogRef  = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
    dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe(
      (response)=>{
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.data = {
      action:'Edit',
      data:values
    }
    dialogConfig.width= "850px";
    const dialogRef  = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
    dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditCategory.subscribe(
      (response)=>{
        this.tableData();
      }
    )
  }
}
