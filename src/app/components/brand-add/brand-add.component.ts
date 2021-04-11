import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  addForm:FormGroup;
  constructor(private brandService:BrandService, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm(){
    this.addForm = this.formBuilder.group({
      name:["",Validators.required]
    })    
  }

  add(){
    if(this.addForm.valid){
      let addModul = Object.assign({},this.addForm.value)
      console.log(addModul)
      this.brandService.addBrand(addModul).subscribe(response=>{
        this.toastrService.success(response.message,"Marka Güncellenmiştir")
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }    
  }
}
