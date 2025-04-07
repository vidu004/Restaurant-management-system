import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BestSellerComponent } from './best-seller/best-seller/best-seller.component';
import { FullComponent } from './layouts/full/full.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouteGuardService } from './services/route-guard.service';
import { ManageCategoryComponent } from './material-component/manage-category/manage-category.component';
import { OurMealsComponent } from './our-meals/our-meals.component';
import { ContactComponent } from './contact/contact.component';
import { ManageProductComponent } from './material-component/manage-product/manage-product.component';
import { ManageOrderComponent } from './material-component/manage-order/manage-order.component';
import { ViewBillComponent } from './material-component/view-bill/view-bill.component';
import { ManageUserComponent } from './material-component/manage-user/manage-user.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' // ✅ Ensures Home is the default page
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin', 'user']
        }
      },

      {
        path: 'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
          expectedRole: ['admin']
        }
      },
      {
        path: 'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
          expectedRole: ['admin']
        }
      },
      {
        path: 'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
          expectedRole: ['admin','user']
        }
      },
      {
        path: 'bill',
        component:ViewBillComponent,
        canActivate:[RouteGuardService],
        data:{
          expectedRole: ['admin','user']
        }
      },
      {
        path: 'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
          expectedRole: ['admin']
        }
      }
    ]
  },
  {
    path: 'best-seller',
    component: BestSellerComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'home' // ✅ Catch-all route
  },
  {
    path:'our-meals',
    component: OurMealsComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'newsletter',
    component: NewsletterComponent
  }

 
];
