import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global-constants';
//import { response } from 'express';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
//import { MatErrorModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatDialogModule,CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatToolbarModule,MatSelectModule,FlexLayoutModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  {

OnAddProduct = new EventEmitter();
 onEditProduct = new EventEmitter();
 productForm:any = FormGroup;
 dialogAction:any = "Add";
 action:any = "Add";
 responseMessage:any;
 categories:any = [];


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
 private formBuilder:FormBuilder,
private productService:ProductService,
public dialogRef:MatDialogRef<ProductComponent>,
private categoryService:CategoryService,
private snackbarService:SnackbarService){
   
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,Validators.required],
      price:[null,Validators.required],
      description:[null,Validators.required]
    })
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategories();
  }

  getCategories(){ 
    this.categoryService.getCategory().subscribe((response:any)=>{
      this.categories = response;

    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
 var formData = this.productForm.value;
 var data = {
  name:formData.name,
  categoryId:formData.categoryId,
  price:formData.price,
  description:formData.description
 } 
 this.productService.add(data).subscribe((response:any)=>{
  this.dialogRef.close();
  this.OnAddProduct.emit();
  this.responseMessage = response.message;
  this.snackbarService.openSnackBar(this.responseMessage,"success");  
 },(error:any)=>{
  if(error.error?.message){
    this.responseMessage = error.error?.message;
  }
  else{
    this.responseMessage = GlobalConstants.genericError;
  }
  this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
 })
}




edit(){
 var formData = this.productForm.value;
 var data = {
  id:this.dialogData.data.id,
  name:formData.name,
  categoryId:formData.categoryId,
  price:formData.price,
  description:formData.description
 } 
 this.productService.update(data).subscribe((response:any)=>{
  this.dialogRef.close();
  this.onEditProduct.emit();
  this.responseMessage = response.message;
  this.snackbarService.openSnackBar(this.responseMessage,"success");  
 },(error:any)=>{
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
