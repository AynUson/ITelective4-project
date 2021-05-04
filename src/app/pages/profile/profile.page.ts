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
  constructor(private router: Router,private http: HttpClient,private data_service: DataService, private modalController:ModalController) { }
  xp:any;
  ngOnInit() {

    this.user=this.data_service.userLoggedIn;
    this.xp = this.user.user_xp / 100;
    console.log(this.user)
    this.getData();
    this.getEquiped();
    this.getOwned();
  }

  async OpenOwnedItemModal() {
    let modal =await this.modalController.create({ component:ViewOwnedPage });
    modal.onDidDismiss().then(()=>{
      this.getData();
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
          this.chartColors = [
            {
              borderColor: '#000000',
              backgroundColor: this.equipedProp
            }
          ]
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

  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Week Productivity'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '',
      backgroundColor: ''
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';

  getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2019-01-14&to=2019-03-12&apikey=demo`).subscribe(res => {
    const history = res['historical'];

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

  logout(){
    this.router.navigate(['login']);
  }
}
