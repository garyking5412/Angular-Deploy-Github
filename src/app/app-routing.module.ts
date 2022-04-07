import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { ProductMenuComponent } from './main/product-menu/product-menu.component';
import { MainModule } from './main/main.module';
import { AboutFullscreenComponent } from './main/about-fullscreen/about-fullscreen.component';
import { HomeComponent } from './main/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { BlogComponent } from './main/blog/blog.component';
import { SpringBootApiComponent } from './spring-boot-api/spring-boot-api.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: 'about', component: AboutFullscreenComponent },
  { path: 'blog', component: BlogComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'product', component: ProductMenuComponent },
  {
    path: 'productDetails/:id',
    component: ProductDetailComponent,
  },
  { path: 'offer', component: ProductDetailComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'SpringBoot',
    component: SpringBootApiComponent,
    // canActivate: [AuthGuardService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
