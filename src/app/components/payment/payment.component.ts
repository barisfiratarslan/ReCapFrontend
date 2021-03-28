import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rent } from 'src/app/models/rent';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm:FormGroup;
  rent:Rent;
  price:number;
  constructor(private paymentService:PaymentService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService,private rentalSrvice:RentalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.rent={
        id:0,
        carID:parseInt(params["carID"]),
        customerID:parseInt(params["costumerID"]),
        rentDate:new Date(params["rentDate"]),
        returnDate:new Date(params["returnDate"]) 
      }
      this.price=parseFloat(params["price"])
    })
    this.createPaymentForm();
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      name:["",Validators.required],
      cardNumber:["",Validators.required &&  Validators.length==12],
      cvv:["",Validators.required && Validators.length==3],
      lastUsingMonth:["",Validators.required],
      lastUsingYear:["",Validators.required]
    })
  }

  pay(){    
    if(this.paymentForm.valid){
      console.log(this.rent)
      let paymentModul = Object.assign({},this.paymentForm.value)
      this.paymentService.paymentRent(paymentModul,this.price).subscribe(response=>{
        this.toastrService.success(response.message)
        this.rentalSrvice.add(this.rent).subscribe(response=>{
          this.toastrService.success(response.message,"Aracınız başarıyla kiralanmıştır")
          console.log(response);
        },responseError=>{
          this.toastrService.error(responseError.error,"Hata")
          console.log(responseError);
        })                
      },responseError=>{
        this.toastrService.error(responseError.error.message)
      })
    }else{
      this.toastrService.error("Formu eksiksiz doldurunuz!")
    }
  }
}
