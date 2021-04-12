import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn:boolean = true;

  isLoggedIn():boolean{
    return this.loggedIn;
  }

  setLogin(): void{
    this.loggedIn = true;
  }

  setLogout():void{
    this.loggedIn = false;
  }

  constructor() { }
}
