import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userName:string;
  constructor(private router: Router, private authService: AuthService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }

  isAuth():boolean{
    if(this.authService.isAuthenticated()==true){
      this.userName = this.localStorageService.getItem("userName").toUpperCase();
    }
    return this.authService.isAuthenticated();
  }

  logout(){
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("userName")
    return this.router.navigate(["/login"])
  }
}
