import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-view-bill-products',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,FlexLayoutModule,MatTableModule,MatTooltipModule],
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit{

  displayedColumns: string[] = ['name','category','price','quantity','total'];
  dataSource:any;
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<ViewBillProductsComponent>){}

  ngOnInit(): void {
    this.data = this.dialogData.data;
  
    // Check if productDetails exists and is valid JSON
    if (this.data && this.data.productDetails) {
      try {
        this.dataSource = JSON.parse(this.data.productDetails);
      } catch (error) {
        console.error('Error parsing productDetails:', error);
        this.dataSource = []; // Set to an empty array if parsing fails
      }
    } else {
      console.warn('Product details are missing or undefined.');
      this.dataSource = []; // Set to an empty array if productDetails is undefined
    }
  }
}

