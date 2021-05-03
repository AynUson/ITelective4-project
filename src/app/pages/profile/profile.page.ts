import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any;
  constructor(private router: Router,private http: HttpClient,private data_service: DataService) { }

  ngOnInit() {
    this.getData();
    this.user=this.data_service.userLoggedIn;
    console.log(this.user)
    this.getEquiped();
    this.getOwned();
  }
  ownedItems:any;
  ownedCount:any = 0;
  equipedTheme:any;
  equipedProp:any="";
  equipedProfile:any
  equipedHeaddress:any
  equips:any

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
