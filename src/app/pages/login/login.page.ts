import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    this.unameInput = this.data_service.newlyusern
    this.pwordInput = this.data_service.newlypword
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
     private data_service: DataService,
     public toastController: ToastController,
     public loadingController: LoadingController
     ) { }

  async Log(e) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Authenticating...',
      duration: 2000,
      spinner:"circular"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    this.loginUser(e);
}

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
        if((this.unameInput == user.user_name || this.unameInput == user.user_email) && this.pwordInput == atob(user.user_pword)){
          this.presentToast("Welcome "+user.user_name+"!")
          this.data_service.userLoggedIn = user;
          this.data_service.user_id = user.user_id;
          this.router.navigate(['/home/dashboard']);
          this.user.setLogin();
          this.data_service.newlyusern = ''
          this.data_service.newlypword = ''
          break;
        }else{
          count++
          if(count == this.users.length){
            this.presentToast('Username or Password is incorrect')
          }

        }
      }
    }else{
      this.presentToast('Fill the fields!')
    }
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
