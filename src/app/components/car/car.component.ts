import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  carImages:CarImage[]=[];
  dataLoaded = false;
  carInfo = false;
  apiUrl : string = "https://localhost:44371/wepapi/carimages/";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandID"] && params["colorID"]){
        this.getCarsByColorAndBrand(params["colorID"],params["brandID"])
      }else if(params["brandID"]){
        this.getCarsByBrand(params["brandID"])
      }else if(params["colorID"]){
        this.getCarsByColor(params["colorID"])
      }else if(params["carID"]){
        this.getCarsByCar(params["carID"])
        this.getCarImagesByCar(params["carID"])
      }else{
        this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByBrand(brandID:number){
    this.carService.getCarsByBrand(brandID).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByColor(colorID:number){
    this.carService.getCarsByColor(colorID).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByColorAndBrand(colorID:number,brandID:number){
    this.carService.getCarsByColorAndBrand(colorID,brandID).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }

  getCarsByCar(carID:number){
    this.carService.getCarsByColor(carID).subscribe(response=>{
      this.cars = response.data
      this.carInfo = true
      this.dataLoaded = true
    })
  }

  getCarImagesByCar(carID:number){
    this.carImageService.getCarImagesByCar(carID).subscribe(response=>{
      console.log(response.data)
      this.carImages = response.data
      this.carInfo = true
      this.dataLoaded = true
    })
  }
}
