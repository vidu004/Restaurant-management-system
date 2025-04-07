import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from '../../../shared/menu-item';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list'
import { AccordionDirective } from '../../../shared/accordian/accordian.directive';
import { AccordionanchorDirective } from '../../../shared/accordian/accordionanchor.directive';
import {AccordionlinkDirective  } from '../../../shared/accordian/accordionlink.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule,MatIconModule,MatToolbarModule,MatListModule,AccordionDirective,AccordionanchorDirective,AccordionlinkDirective,RouterModule],  // Import CommonModule for Angular common directives like ngIf, ngFor, etc.
  templateUrl: './sidebar.component.html',  // Keep your template file as is
  styleUrls: ['./sidebar.component.scss'],  // Keep your styles as is
  providers: [MenuItems]
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  token:any= localStorage.getItem('token'); 
  tokenPayload:any;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.tokenPayload = jwtDecode(this.token);  // Decode token to check user role  
    // Media query listener to detect the screen size change
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); // Add listener to the query
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener); // Clean up listener when destroyed
  }
}
