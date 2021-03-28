import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rent } from '../models/rent';
import { Rental } from '../models/rentals';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl:string="https://localhost:44371/api/rentals/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newUrl = this.apiUrl + "getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  checkDate(rent:Rent):Observable<ResponseModel>{
    let newUrl=this.apiUrl + "checkdate";
    return this.httpClient.post<ResponseModel>(newUrl,rent)
  }

  add(rent:Rent):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newUrl,rent)
  }
}
