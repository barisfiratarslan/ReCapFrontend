import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  updateForm:FormGroup;
  brand:Brand;
  constructor(private brandService:BrandService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrand(params["brandID"]);
      this.createBrandForm();  
    })      
  }

  createBrandForm(){
    this.updateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required]
      
    })    
  }

  getBrand(brandID:number){
    this.brandService.getBrand(brandID).subscribe(response=>{
      this.brand = response.data;
    })
  }

  update(){
    if(this.updateForm.valid){
      let updateModul = Object.assign({},this.updateForm.value)
      console.log(updateModul)
      this.brandService.updateBrand(updateModul).subscribe(response=>{
        this.toastrService.success(response.message,"Marka Güncellenmiştir")
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }    
  }
}
