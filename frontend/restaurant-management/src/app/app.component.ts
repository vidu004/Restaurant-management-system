import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AccordionDirective, AccordionlinkDirective, AccordionanchorDirective } from './shared/accordian'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxUiLoaderModule,AccordionDirective,AccordionlinkDirective,AccordionanchorDirective
   
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurant-management';
}
