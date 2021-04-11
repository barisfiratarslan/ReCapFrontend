import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars:CarDetail[]=[];
  dataLoaded=false;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true
    })
  }
}
