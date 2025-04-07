import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { response } from 'express';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,FlexLayoutModule,MatTableModule,MatIconModule,MatTooltipModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent implements OnInit{


 displayColumns:string[] = ['name','category','price','quantity','total','edit'];
 dataSource:any=[];
 manageOrderForm:any = FormGroup;
 categories:any = [];
 products:any = [];
 price:any= [];
 totalAmount:number = 0;
 responseMessage:any;




 constructor(private formBuilder:FormBuilder,
  private categoryService:CategoryService,
  private productService:ProductService,
  private snackbarService:SnackbarService,
  private billService:BillService,
  private ngxService:NgxUiLoaderService){}

 ngOnInit(): void {
  this.ngxService.start();
  this.getCategory();
  this.manageOrderForm = this.formBuilder.group({
    name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
    email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
    contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
    paymentMethod:[null,[Validators.required]],
    product:[null,[Validators.required]],
    category:[null,[Validators.required]],
    quantity:[null,[Validators.required]],
    price:[null,[Validators.required]],
    total:[0,[Validators.required]]

  });
   
 }getCategory(){
  this.categoryService.getCategory().subscribe((response:any)=>{
    this.ngxService.stop();
    this.categories = response;
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

 getProductByCategory(value:any){
   this.productService.getProductsByCategory(value.id).subscribe((response:any)=>{
    this.products = response;
    this.manageOrderForm.controls['price'].setValue('');
    this.manageOrderForm.controls['quantity'].setValue('');
    this.manageOrderForm.controls['total'].setValue(0);
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


 getProductDetails(value:any){
  this.productService.getById(value.id).subscribe((response:any)=>{
    this.price= response.price;
    this.manageOrderForm.controls['price'].setValue(response.price);
    this.manageOrderForm.controls['quantity'].setValue('1');
    this.manageOrderForm.controls['total'].setValue(this.price*1);

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

 setQuantity(value:any){
  var temp = this.manageOrderForm.controls['quantity'].value;
  if(temp>0){
    this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
  }
  else if(temp!=''){
    this.manageOrderForm.controls['quantity'].setValue('1');
    this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
  }
 }

validateProductAdd(){
  if(this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value <=0)
    return true;

    else 
    return false;
}

validateSubmit(){
  if(this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null ||  !(this.manageOrderForm.controls['contactNumber'].valid || this.manageOrderForm.controls['email'].valid === null || this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null ||  !(this.manageOrderForm.controls['email'].valid)))
    return true;

  else
   return false
}


add() {
  const formData = this.manageOrderForm.value;
  const existingProduct = this.dataSource.find((e: { id: number }) => e.id === formData.product.id);

  if (!existingProduct) {
      this.totalAmount += formData.total;
      this.dataSource = [
          ...this.dataSource,
          {
              id: formData.product.id,
              name: formData.product.name,
              category: formData.category.name,
              quantity: formData.quantity,
              price: formData.price,
              total: formData.total,
          },
      ];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded, "success");
  } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
  }
}



handleDeleteAction(value:any,element:any){
  this.totalAmount = this.totalAmount - element.total;
  this.dataSource.splice(value,1);
  this.dataSource = [...this.dataSource];
}

submitAction() {
  this.ngxService.start();
  var FormData = this.manageOrderForm.value;
  var data = {
    name: FormData.name,
    email: FormData.email,
    contactNumber: FormData.contactNumber,
    paymentMethod: FormData.paymentMethod,
    totalAmount: this.totalAmount,
    productDetails: JSON.stringify(this.dataSource),
    bill_datetime: new Date().toISOString()  // Adding bill datetime
  };

  console.log("Data sent to backend:", data); // Log the data being sent

  this.billService.generateReport(data).subscribe((response: any) => {
    console.log("Report generation response:", response);
    this.downloadFile(response?.uuid);
    this.manageOrderForm.reset();
    this.dataSource = [];
    this.totalAmount = 0;
  }, (error: any) => {
    this.ngxService.stop();
    console.error("Error in report generation:", error); // Debugging log
    if (error.error?.message) {
      this.responseMessage = error.error?.message;
    } else {
      this.responseMessage = GlobalConstants.genericError;
    }
    this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
  });
}


downloadFile(fileName: any) {
  console.log("Downloading file with UUID:", fileName); // Debugging log

  var data = { uuid: fileName };

  this.billService.getPDF(data).subscribe(
    (response: any) => {
      console.log("PDF Download Response:", response); // Debugging log
      saveAs(response, fileName + ".pdf");
      this.ngxService.stop();
    },
    (error: any) => {
      console.error("Error downloading PDF:", error); // Debugging log
      this.ngxService.stop();
    }
  );
}


}
