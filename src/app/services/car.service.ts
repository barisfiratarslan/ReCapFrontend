import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string="https://localhost:44371/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandID:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsbybrand?brandID="+brandID;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorID:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsbycolor?colorID="+colorID;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorAndBrand(colorID:number, brandID:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsbycolor?colorID="+colorID+"&brandID="+brandID;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByCar(carID:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcarsbycar?carID="+carID;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }
}
