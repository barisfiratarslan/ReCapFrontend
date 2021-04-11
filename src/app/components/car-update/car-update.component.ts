import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  updateForm:FormGroup;
  brands:Brand[]=[];
  colors:Color[]=[];
  car:Car;
  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder,private colorService:ColorService,private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCar(params["carID"]);
      this.createCarForm();  
    }) 
    this.getBrands();
    this.getColors();
  }

  getCar(carID:number){
    this.carService.getCar(carID).subscribe(response=>{
      this.car=response.data
    })
  }

  createCarForm(){
    this.updateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      brandID:["",Validators.required],
      colorID:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required]
    })    
  }

  update(){
    if(this.updateForm.valid){
      let updateModul = Object.assign({},this.updateForm.value)
      console.log(updateModul)
      this.carService.updateCar(updateModul).subscribe(response=>{
        this.toastrService.success(response.message,"Araba Güncellenmiştir")
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }    
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

  setCurrentColorClass(color:Color){
    if(color.id==this.car.colorID){
      return "selected"
    }
    return "";
  }
}
