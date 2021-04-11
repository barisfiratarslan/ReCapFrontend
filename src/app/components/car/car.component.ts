import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarDetail[]=[];
  colors:Color[]=[];
  brands:Brand[]=[];
  car:CarDetail;
  carImages:CarImage[]=[];
  filterText = "";
  colorName = "";
  brandName = "";
  dataLoaded = false;
  carInfo = false;
  apiUrl : string = "https://localhost:44371/img/";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private carImageService:CarImageService, private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandID"] && params["colorID"]){
        this.getCarsByColorAndBrand(params["colorID"],params["brandID"])
        this.getColors();
        this.getBrands();
      }else if(params["brandID"]){
        this.getCarsByBrand(params["brandID"])
        this.getColors();
        this.getBrands();
      }else if(params["colorID"]){
        this.getCarsByColor(params["colorID"])
        this.getColors();
        this.getBrands();
      }else if(params["carID"]){
        this.getCarsByCar(params["carID"])
        this.getCarImagesByCar(params["carID"])        
        this.getColors();
        this.getBrands();
      }else{
        this.getCars();
        this.getColors();
        this.getBrands();
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
    console.log(colorID + " " + brandID);     
  }

  getCarsByCar(carID:number){
    this.carService.getCarsByCar(carID).subscribe(response=>{
      this.car = response.data
      this.carInfo = true
      this.dataLoaded = true
    })
  }

  getCarImagesByCar(carID:number){
    this.carImageService.getCarImagesByCar(carID).subscribe(response=>{
      this.carImages = response.data
      this.carInfo = true
      this.dataLoaded = true
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }
}
