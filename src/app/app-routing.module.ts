import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentComponent } from './components/rent/rent.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},  
  {path:"rentals/rent/car/:carID/:dailyPrice", component:RentComponent, canActivate:[LoginGuard]},
  {path:"rentals/payment/car/:carID/:price/:costumerID/:rentDate/:returnDate", component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"brands", component:BrandListComponent},
  {path:"brands/update/brand/:brandID", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands/brandAdd", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors", component:ColorListComponent},
  {path:"colors/update/color/:colorID", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/addColor", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"cars", component:CarListComponent},
  {path:"cars/update/car/:carID", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars/addCar", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandID", component:CarComponent},
  {path:"cars/color/:colorID", component:CarComponent},
  {path:"cars/detail/car/:carID", component:CarComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"account",component:AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
