import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { response } from 'express';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatTableModule,MatButtonModule,MatIconModule,MatTooltipModule,MatSlideToggleModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements OnInit{
  displayedColumns:string[] = ['name','categoryName','description','price','edit'];
  dataSource:any;
  responseMessage:any;
  

  constructor(private productService:ProductService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }


  tableData(){
   this.productService.getProducts().subscribe((response:any)=>{
    this.ngxService.stop();
    this.dataSource = new MatTableDataSource(response);
   },(error:any)=>{
    this.ngxService.stop();
    console.log(error);
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


  handleAddAction(){
   const dialogConfig = new MatDialogConfig();
   dialogConfig.data ={
    action:'Add'
   }
   dialogConfig.width= "850px";
   const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
   this.router.events.subscribe(()=>{
    dialogRef.close();
   })
   const sub = dialogRef.componentInstance.OnAddProduct.subscribe((response)=>{
    this.tableData();
   })
  }

  handleEditAction(value:any){
    const dialogConfig = new MatDialogConfig();
   dialogConfig.data ={
    action:'Edit',
    data:value
   }
   dialogConfig.width= "850px";
   const dialogRef = this.dialog.open(ProductComponent,dialogConfig);
   this.router.events.subscribe(()=>{
    dialogRef.close();
   })
   const sub = dialogRef.componentInstance.onEditProduct.subscribe((response)=>{
    this.tableData();
   })
  }

  handleDeleteAction(value:any){
   const dialogConfig = new MatDialogConfig();
   dialogConfig.data ={
    message:'delete '+value.name+' product'
  };
  const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
  const sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
    this.ngxService.start();
    this.deleteProduct(value.id);
    dialogRef.close();
  })
  }

  deleteProduct(id:any){
    this.productService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;  
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.ngxService.stop();
    console.log(error);
    if(error.error?.message){
      this.responseMessage = error.error?.message;
    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }


  onChange(status:any,id:any){
   var data ={
    status:status.toString(),
    id:id
   }
   this.productService.updateStatus(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.responseMessage= response?.message;
    this.snackbarService.openSnackBar(this.responseMessage,"success");
   },(error:any)=>{
    this.ngxService.stop();
    console.log(error);
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
