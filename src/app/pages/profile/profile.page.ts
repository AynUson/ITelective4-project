import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ViewOwnedPage } from "../../modals/view-owned/view-owned.page";

import {  AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any;
  constructor(private router: Router,private http: HttpClient,private data_service: DataService, private modalController:ModalController,public alertController: AlertController) { }

  ngOnInit() {
    this.data_service.checkStorage()
    this.user=this.data_service.userLoggedIn;
    this.gold = this.data_service.userLoggedIn.user_gold
    this.xp = this.user.user_xp / 100;
    console.log(this.user)
    this.ownedCount = 0
    this.getTasks();
    this.getEquiped();
    this.getOwned();
    this.getUsers()
  }
  ionViewDidEnter() {
    this.data_service.checkStorage()
    this.user=this.data_service.userLoggedIn;
    console.log(this.user)
    this.ownedCount = 0
    this.getTasks();
    this.getEquiped();
    this.getOwned();
    this.getUsers()

  }

  users:any = []
  gold:any;
  xp:any;
  public getUsers(){
    this.data_service.sendAPIRequest("user/"+this.data_service.userLoggedIn.user_id, null)
    .subscribe(result=>{
      this.users = result.payload;
      for(let user of this.users){
        this.gold=user.user_gold
        this.xp=user.user_xp/ 100
        console.log("CURRENT USER GOLD: "+user.user_gold)
      }
  });
  }

  async OpenOwnedItemModal() {
    let modal =await this.modalController.create({ component:ViewOwnedPage });
    modal.onDidDismiss().then(()=>{
      this.getTasks();
    this.getEquiped();
    this.getOwned();
    this.ownedCount = 0
    });
      modal.present();

  }

  equipedTheme:any;
  equipedProp:any="";
  equipedProfile:any
  equipedHeaddress:any
  equips:any
  ownedItems:any;
  ownedCount:any = 0;
  getOwned(){
    this.ownedCount = 0
    this.data_service.sendAPIRequest("getOwned/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
      this.ownedItems = data.payload
      console.log(this.ownedItems )
      for(let eq of this.ownedItems){
        this.ownedCount++
        console.log(eq.item_name )
      }
    });
  }

  getEquiped(){
    this.data_service.sendAPIRequest("getEquiped/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
      this.equips = data.payload
      console.log(this.equips)
      for(let eq of this.equips){
        if(eq.item_category_id == 1){
          this.equipedTheme = eq.item_name
          this.equipedProp = eq.item_property
          // this.chartColors = [
          //   {
          //     borderColor: '#000000',
          //     backgroundColor: this.equipedProp
          //   }
          // ]
          console.log("Property: "+this.equipedProp)

        }
        if(eq.item_category_id == 2){
          this.equipedHeaddress = eq.item_property
          console.log(this.equipedTheme)
        }
        if(eq.item_category_id == 3){
          this.equipedProfile = eq.item_property
          console.log(this.equipedTheme)
        }

      }
    });
  }

  colorHex:any = ['#FB3640','#EFCA08','#43AA8B','#253D5B']
  chartData: ChartDataSets[] = [{
     data: [],
     backgroundColor:  this.colorHex

    }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };

  chartType = 'pie';
  showLegend = true;

  // For search
  stock = '';
  school:number = 0;
  work:number = 0;
  fitness:number = 0;
  others:number = 0;
  getTasks(){
    this.school = 0
    this.work = 0
    this.fitness = 0
    this.others = 0
    this.data_service.sendAPIRequest("task/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
      const tasks = data.payload
      this.chartLabels = ['School','Work','Fitness','Others'];
      this.chartData[0].data = [];

    for (let entry of tasks) {
      if(entry.category_id == 1){
        this.school++
      }
      if(entry.category_id == 2){
        this.work++
      }
      if(entry.category_id == 3){
        this.fitness++
      }
      if(entry.category_id == 4){
        this.others++
      }
      this.chartData[0].data = [this.school,this.work, this.fitness,this.others]
    }
    });
  }


  getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2019-01-14&to=2019-03-12&apikey=demo`).subscribe(res => {
    const history = res['historical'];
    console.log(history)
    this.chartLabels = [];
    this.chartData[0].data = [];

    for (let entry of history) {
      this.chartLabels.push(entry.date);
      this.chartData[0].data.push(entry['close']);
    }
  });
}

typeChanged(e) {
  const on = e.detail.checked;
  this.chartType = on ? 'line' : 'bar';
}


async logoutbtn(){


    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Logging out?',
      message: 'Be sure to be back!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {

            this.data_service.logout();
            if(this.data_service.userLoggedIn == null)
            this.router.navigate(['/login'])
          }
        }
      ]
    });

    await alert.present();

}


  logout(){
    this.data_service.logout();
  }
}
