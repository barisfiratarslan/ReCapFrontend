import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { PaymentComponent } from './components/payment/payment.component';
import { RentComponent } from './components/rent/rent.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},  
  {path:"rentals/rent/car/:carID/:dailyPrice", component:RentComponent},
  {path:"rentals/payment/car/:carID/:price/:costumerID/:rentDate/:returnDate", component:PaymentComponent},
  {path:"brands", component:BrandListComponent},
  {path:"brands/update/brand/:brandID", component:BrandUpdateComponent},
  {path:"brands/brandAdd", component:BrandAddComponent},
  {path:"colors", component:ColorListComponent},
  {path:"colors/update/color/:colorID", component:ColorUpdateComponent},
  {path:"colors/addColor", component:ColorAddComponent},
  {path:"cars", component:CarListComponent},
  {path:"cars/update/car/:carID", component:CarUpdateComponent},
  {path:"cars/addCar", component:CarAddComponent},
  {path:"cars/brand/:brandID", component:CarComponent},
  {path:"cars/color/:colorID", component:CarComponent},
  {path:"cars/detail/car/:carID", component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
