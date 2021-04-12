import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  uname:string = "admin"
  pword:string = "admin"

  constructor(private user:UserService, private router:Router) { }

  ngOnInit() {
  }

  login(e): void{
    e.preventDefault();

    if(this.uname == e.target.uname.value && this.pword == e.target.pword.value){
      console.log(e.target.uname.value);
    console.log(e.target.pword.value);
      this.user.setLogin();
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['']);
    }
  }
}
