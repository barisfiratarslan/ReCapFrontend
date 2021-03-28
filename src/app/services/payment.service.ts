import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Rent } from '../models/rent';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl:string="https://localhost:44371/api/"
  constructor(private httpCliect:HttpClient) { }

  paymentRent(payment:Payment,price:number):Observable<ResponseModel>{
    let newPath=this.apiUrl+"creditcards/payment?price="+price;
    return this.httpCliect.post<ResponseModel>(newPath,payment);
  }
}
