import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentComponent } from './components/rent/rent.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandID", component:CarComponent},
  {path:"cars/color/:colorID", component:CarComponent},
  {path:"rentals/rent/car/:carID/:dailyPrice", component:RentComponent},
  {path:"rentals/payment/car/:carID/:price/:costumerID/:rentDate/:returnDate", component:PaymentComponent},
  {path:"cars/:carID", component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
