import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  updateForm:FormGroup;
  color:Color
  constructor(private colorService:ColorService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getColor(params["colorID"]);
      this.createColorForm();  
    })  
  }

  createColorForm(){
    this.updateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required]
      
    })    
  }

  getColor(brandID:number){
    this.colorService.getColor(brandID).subscribe(response=>{
      this.color = response.data;
    })
  }

  update(){
    if(this.updateForm.valid){
      let updateModul = Object.assign({},this.updateForm.value)
      console.log(updateModul)
      this.colorService.updateColor(updateModul).subscribe(response=>{
        this.toastrService.success(response.message,"Marka Güncellenmiştir")
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }    
  }

}
