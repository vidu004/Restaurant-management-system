import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Import this
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { NgxUiLoaderModule } from "ngx-ui-loader"; // Import the module
import { ngxUiLoaderConfig } from './app/ngx-ui-loader-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './app/services/token-interceptor.interceptor'; // Import the interceptor

// Import the modules you need from Material, FlexLayout, Forms, and Shared
import { FlexLayoutModule } from '@angular/flex-layout'; // Flex Layout Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Forms and Reactive Forms

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // HTTP interceptors configuration has changed, apply them via provideHttpClient
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,  // Required for Angular Material
      HttpClientModule,         // Add HttpClientModule here to enable interceptors
      FlexLayoutModule,         // Import Flex Layout Module
      FormsModule,              // Import Forms Module
      ReactiveFormsModule,      // Import Reactive Forms Module
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig) // Correct method to add the loader
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true, // Allow multiple interceptors
    },
  ],
}).catch((err) => console.error(err));
