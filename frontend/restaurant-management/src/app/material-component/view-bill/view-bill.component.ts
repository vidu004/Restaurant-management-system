import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatTableModule,MatIconModule,MatButtonModule,MatTooltipModule,FlexLayoutModule],
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.scss'
})
export class ViewBillComponent implements OnInit{


  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total','view'];
  dataSource:any;
  responseMessage:any;

  constructor(private billService:BillService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router){}


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
   this.billService.getBills().subscribe((response:any)=>{
    this.ngxService.stop();
    this.dataSource = new MatTableDataSource(response);
   },(error:any)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage= error.error?.message;
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

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values,
    };
    dialogConfig.width = "50%"; // Set the width of the dialog
    dialogConfig.height = "auto"; // Optional: Adjust height if needed
    
    dialogConfig.panelClass = 'custom-dialog-container'; // Optional: Add custom styles
  
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  downloadReportAction(values:any){
   this.ngxService.start();
   var data={
    name:values.name,
    email:values.email,
    uuid:values.uuid,
    contactNumber:values.contactNumber,
    paymentMethod:values.paymentMethod,
    totalAmount:values.total,
    productDetails:values.productDetails

   }
   this.billService.getPDF(data).subscribe((response)=>{
    saveAs(response,values.uuid+' .pdf');
    this.ngxService.stop();
   })
  }

  handleDeleteAction(values:any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    message: 'delete '+values.name+' bill'
  };
  const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
  const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
    this.ngxService.start();
    this.deleteProduct(values.id);
    dialogRef.close();

  })
  }

 deleteProduct(id:any){
  this.billService.delete(id).subscribe((response:any)=>{
    this.ngxService.stop();
    this.tableData();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackBar(this.responseMessage,"Success");
  },(error:any)=>{
    this.ngxService.stop();
    if(error.error?.message){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
  })
 }
}

