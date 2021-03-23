import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44371/api/carimages/getcarimagesbycarid?carid="
  constructor(private httpClient:HttpClient) { }

  getCarImagesByCar(carID:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+carID;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
