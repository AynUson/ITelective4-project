import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

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
  constructor(private user:UserService, private router:Router,public alertController: AlertController) { }

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
    this.router.navigate(['/home']);
  }


  ngOnInit() {
  }

  login(e): void{
    e.preventDefault();


    if(this.unameInput != '' && this.pwordInput != ''){
      if(this.uname == this.unameInput && this.pword == this.pwordInput ){
        console.log(this.unameInput);
        console.log(this.pwordInput);
        this.presentAlert('Success','Welcome '+ this.name)
        this.user.setLogin();

      }else{
        if(this.unameInput == null || this.pwordInput == null){
          this.presentAlert('Warning','Fill the fields!')
        }
        if(this.unameInput != null && this.pwordInput != null){
          this.presentAlert('Warning','Username or Password is incorrect')
        }


      }
    }


  }
}
