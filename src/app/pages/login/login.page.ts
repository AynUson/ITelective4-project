import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name:string = 'Ayn'
  uname:string = "admin"
  pword:string = "admin"
  unameInput:string;
  pwordInput:string;
  users:any;




  ngOnInit() {
    this.getUsers();
  }

  showPassword = false;
  passwordToggleIcon = 'eye';

  togglePassword():void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private user:UserService,
     private router:Router,
     public alertController: AlertController,
     private data_service: DataService
     ) { }

  public getUsers(){
    this.data_service.sendAPIRequest(("user"), null)
    .subscribe(result=>{
      this.users = result.payload;
      console.log(this.users)
  });
  }

  loginUser(e){
    e.preventDefault();
    this.getUsers();
    let count = 0
    if(this.unameInput != null && this.pwordInput != null){
      for(let user of this.users){
        if((this.unameInput == user.user_name || this.unameInput == user.user_email) && this.pwordInput == user.user_pword){
          this.presentAlert('Success','Welcome '+ user.user_name)
          this.data_service.userLoggedIn = user;
          this.data_service.user_id = user.user_id;
          this.router.navigate(['/home']);
          this.user.setLogin();
          break;
        }else{
          count++
          if(count == this.users.length){
            this.presentAlert('Warning','Username or Password is incorrect')
          }

        }
      }
    }else{
      this.presentAlert('Warning','Fill the fields!')
    }
  }

  async presentAlert(title, sub) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: sub,
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }



  login(e): void{
    e.preventDefault();


    if(this.unameInput != '' && this.pwordInput != ''){
      if(this.uname == this.unameInput && this.pword == this.pwordInput ){
        console.log(this.unameInput);
        console.log(this.pwordInput);
        this.presentAlert('Success','Welcome '+ this.name)
        this.router.navigate(['/home']);
        this.user.setLogin();

      }else{

        if(this.unameInput != null && this.pwordInput != null){
          this.presentAlert('Warning','Username or Password is incorrect')
        }


      }
    }if(this.unameInput == null || this.pwordInput == null){
      this.presentAlert('Warning','Fill the fields!')
    }


  }
}
