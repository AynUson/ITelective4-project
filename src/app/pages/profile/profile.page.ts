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
  }
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stock price'
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
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
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
