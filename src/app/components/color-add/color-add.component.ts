import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  addForm:FormGroup;
  constructor(private colorService:ColorService, private toastrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createColorForm();
  }

  createColorForm(){
    this.addForm = this.formBuilder.group({
      name:["",Validators.required]
    })    
  }

  add(){
    if(this.addForm.valid){
      let addModul = Object.assign({},this.addForm.value)
      console.log(addModul)
      this.colorService.addColor(addModul).subscribe(response=>{
        this.toastrService.success(response.message,"Renk Güncellenmiştir")
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }    
  }
}
