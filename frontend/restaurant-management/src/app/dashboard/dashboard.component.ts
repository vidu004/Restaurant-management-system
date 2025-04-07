import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { MaterialModule } from '../shared/material-module';
import { MatButtonModule } from '@angular/material/button'; // ✅ Import only what is needed
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexLayoutModule, MatButtonModule, MatCardModule,MatIconModule,MatToolbarModule,MatFormFieldModule,MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  responseMessage:any;
  data:any


  ngAfterViewInit(): void {
    
  }

  constructor(private dashboardService: DashboardService,
    private ngxService:NgxUiLoaderService,
    private snackbarService: SnackbarService) {
      this.ngxService.start();
      this.dashboardData();
     }

     dashboardData(){
      this.dashboardService.getDetails().subscribe((response:any)=>{
        this.ngxService.stop();
        this.data= response;

      },(error:any)=>{
        this.ngxService.stop();
        console.log(error);
        if(error.error?.message){
          this.responseMessage= error.error?.message;
        }
        else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      }
    )
     }
}
