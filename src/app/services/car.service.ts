import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl:string="https://localhost:44371/api/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCar(carID:number):Observable<SingleResponseModel<Car>>{
    return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl+"cars/getbyid?id="+carID);
  }

  getCarsByBrand(brandID:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbybrand?brandID="+brandID;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorID:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbycolor?colorID="+colorID;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorAndBrand(colorID:number, brandID:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbycolor?colorID="+colorID+"&brandID="+brandID;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByCar(carID:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbycar?carID="+carID;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car);
  }  
}
