import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  carID:string;
  dailyPrice:number;
  rentForm:FormGroup;
  customers:Customer[]=[];
  constructor(private formBuilder:FormBuilder,private rentalService:RentalService, private customerService:CustomerService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.carID=params["carID"]
      this.dailyPrice =parseFloat(params["dailyPrice"])
    })
    this.createRentForm();
    this.getCustomer();
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data
    })
  }

  createRentForm(){
    this.rentForm = this.formBuilder.group({
      customerID:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  addRental(){
    if(this.rentForm.valid){      
      let rent={
        carID:parseInt(this.carID)
      }
      let rentModul = Object.assign({}, this.rentForm.value,rent);
      console.log(rentModul)
      this.rentalService.checkDate(rentModul).subscribe(response=>{
        console.log(response);        
        let price = (Math.floor(Date.parse(this.rentForm.get("returnDate").value) - Date.parse(this.rentForm.get("rentDate").value))/(1000*60*60*24) + 1)*this.dailyPrice
        this.router.navigateByUrl("rentals/payment/car/"+this.carID+"/"+price+"/"+this.rentForm.get("customerID").value+"/"+this.rentForm.get("rentDate").value+"/"+this.rentForm.get("returnDate").value)
        this.toastrService.success(response.message,"Başarılı");
        
      },responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError.error.message,"")
      })
    }else{
      this.toastrService.error("Bilgileri eksiksiz giriniz!")
    }
  }

}
