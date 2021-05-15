import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('uname') uuname;
  @ViewChild('email') email;
  unameInput:any = '';
  emailInput:any = '';
  pwordInput:any = '';
  pwordConfirm:any = '';

  constructor(
    private router:Router,
    public alertController: AlertController,
    private data_service: DataService,
    public toastController: ToastController,
    public loadingController: LoadingController
    ) { }


  ngOnInit() {
    setTimeout(() => {
      this.uuname.setFocus();
    },150);
  }

  doneSignup:boolean = false;
  async loadSignup(){
    this.doneSignup =false
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Processing...',
      duration: 2000,
      spinner:"circular"
    });
    await loading.present();


    console.log('Loading dismissed!');
    this.signup();
  }

async dismiss() {
  this.doneSignup = true;
  if(this.doneSignup){
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  this.doneSignup = false;
}

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  showPassword = false;
  passwordToggleIcon = 'eye';

  togglePassword():void {
    this.showPassword = !this.showPassword;
  }
  username:any
  userdata:any = {};
  count:number=0;

  users:any={}
  allowsignup:boolean=false;
  public getUsers(){
    this.validateAll();
    this.checkFields();
    this.data_service.sendAPIRequest(("user"), null)
    .subscribe(result=>{
      this.users = result.payload;
      this.allowsignup =true
      for(let user of this.users){
        if(user.user_name == this.unameInput){
          this.presentToast("Username already exist")
          this.allowsignup =false
          break;
        }
        if(user.user_email == this.emailInput){
          this.presentToast("Email already exist")
          this.allowsignup =false
          break;
        }
        if(this.allowsignup){
          break;
        }
      }
      console.log(this.users)
  });
  }
  default:any = {};
  user:any = {};
  newUser:any = {}
  user_id;
  async signup(){
    this.fieldsFilled = false
    this.pwordMatch = false
    this.emailValid = false
    this.getUsers();
    console.log('Allow '+this.allowsignup)
    this.validateAll();
    this.checkFields();
    console.log("FIELDLIST: "+ this.fieldsFilled +" PWORD: "+ this.pwordMatch+" EMAIL: "+ this.emailValid)
    if(this.fieldsFilled && this.pwordMatch && this.emailValid && this.allowsignup){
          this.user.user_name = this.unameInput
          this.user.user_email = this.emailInput
          this.user.user_pword = btoa(this.pwordInput)
          this.user.user_gold = 50
          this.data_service.newlyusern = this.unameInput
          this.data_service.newlypword = this.pwordInput
          this.data_service.sendAPIRequest("createUser/", this.user)
          .subscribe(result=>{
            console.log(result)
            this.newUser = result.payload
            for(let user of this.newUser){
              if(user.user_name == this.user.user_name){
                this.user_id = user.user_id
                console.log("New user id: "+ this.user_id)
              }
          }
          this.default.user_id = this.user_id
          this.default.item_id = 1
          this.default.isEquiped = 1
          this.data_service.sendAPIRequest("giveDefault/", this.default)
          .subscribe(result=>{
            console.log(result)
          });
          this.default.item_id = 30
          this.data_service.sendAPIRequest("giveDefault/", this.default)
          .subscribe(result=>{
            console.log(result)
          });
          this.default.item_id = 31
          this.data_service.sendAPIRequest("giveDefault/", this.default)
          .subscribe(result=>{
            console.log("Success!")
            this.clearFields();
            this.router.navigate(['/login']);
            this.dismiss();
          });

         });


      //On user creation
  //  insert default items on user_inventory
  //    and equip
    }
  }
  validateAll(){
    this.checkFields();
    if(this.fieldsFilled){
      this.passwordMatch();
        this.validate();
        this.checkUserN()
        this.checkFields();

    }

  }


  usernAvail:boolean =false;
  usern:any;
  userResp:any = {}
  checkUserN(){
    this.userdata = {}
    this.userResp.count = 0
    this.usernAvail = false
    this.data_service.sendAPIRequest("usernCheck/"+this.unameInput, null)
    .subscribe(result=>{

      this.userdata = result.payload;
      console.log(this.userdata)
      for(let user of this.userdata ){
        this.userResp.count++
        this.usern = user.user_name
      }
      if(this.userResp.count < 1){
        console.log("username available" + this.usern)
      }else{
        this.unameInput = ''
        this.fieldsFilled = false
        setTimeout(() => {
          this.uuname.setFocus();
        },150);

        this.presentToast("Username already exist")
      }
  });
  this.checkFields();
  }
  emailAvail:boolean = false
  uemail:any;
  emaildata:any = {};
  emailResp:any = {}
  validate() {
    this.emaildata = {}
    this.emailValid = false
    this.emailAvail = false
    const email = this.emailInput;

      if (this.validateEmail(email)) {
        this.emailResp.count = 0
      console.log("Email is valid!");
      this.emailValid = true
      this.data_service.sendAPIRequest("emailCheck/"+this.emailInput, null)
      .subscribe(result=>{
        this.emaildata = result.payload;
        console.log(this.emaildata)
        for(let user of this.emaildata ){
          this.emailResp.count++
          this.uemail = user.user_email
        }
        if(this.emailResp.count < 1){
          console.log("email available " + this.uemail)

        }else{
          this.emailInput = ''
          this.fieldsFilled = false
          setTimeout(() => {
            this.email.setFocus();
          },150);

          this.presentToast("Email already exist")
        }
    });
    this.checkFields();
    } else {
      this.presentToast("Email is invalid")
    }
  }


  clearFields(){
    this.unameInput=""
    this.pwordInput=""
    this.emailInput=""
    this.pwordConfirm=""
  }

  fieldsFilled:boolean = false
  checkFields(){
    this.fieldsFilled = false
    if(this.unameInput!='' && this.pwordInput!='' && this.emailInput!='' && this.pwordConfirm!=''){
      console.log("Sign up")
      this.fieldsFilled = true
    }else{
      this.presentToast("Fill up the fields!");
    }
  }
  pwordLenCheck:boolean = false;
  pwordMatch:boolean = false;
  passwordMatch(){
    if(this.pwordInput.length >= 8){
      this.pwordMatch = false
      if(this.pwordInput == this.pwordConfirm){
        this.pwordMatch = true
        console.log("Password Match!")
      }else{
        this.pwordMatch = false
        this.presentToast("Password not match!")
      }
    }else{
      this.presentToast('Password too short')
    }

  }
  emailValid:boolean =false;
  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }



}
