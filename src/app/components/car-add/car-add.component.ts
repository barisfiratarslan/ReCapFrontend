import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  addForm:FormGroup;
  brands:Brand[]=[];
  colors:Color[]=[];
  constructor(private carService:CarService, private toastrService:ToastrService, private formBuilder:FormBuilder,private colorService:ColorService,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createCarForm();
    this.getBrands();
    this.getColors();
  }

  createCarForm(){
    this.addForm = this.formBuilder.group({
      name:["",Validators.required],
      brandID:["",Validators.required],
      colorID:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required]
    })    
  }

  add(){
    if(this.addForm.valid){
      let addModul = Object.assign({},this.addForm.value)
      console.log(addModul)
      this.carService.addCar(addModul).subscribe(response=>{
        this.toastrService.success(response.message,"Araba Eklenmiştir")
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
}
