import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User;
  acountForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService, private router:Router, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    this.getUser(this.localStorageService.getItem("userName"));
  }

  createRegisterForm(){
    this.acountForm = this.formBuilder.group({
      id: ["", Validators.required],
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  getUser(firstName:string){
    this.authService.GetUser(firstName).subscribe(response=>{
      this.user=response;
    })
  }

  update(){
    if(this.acountForm.valid){
      console.log(this.acountForm.value);
      let acountModel = Object.assign({}, this.acountForm.value);
      this.authService.updateUser(acountModel).subscribe(response=>{
        this.toastrService.success("Başarılıyla güncellenmiştir");
      })
    }
  }
}
