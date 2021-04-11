import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key:string){
    let value=localStorage.getItem(key);
    return value;
  }

  addItem(key:string,value:string){
    localStorage.setItem(key,value);
  }

  removeItem(key:string){
    localStorage.removeItem(key);
  }
}
