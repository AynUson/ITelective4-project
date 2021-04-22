import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  user:any;

  constructor(private router: Router,private data_service: DataService) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    this.getCateg();
  }

  items:any[] =[];
  getCateg(){
    this.data_service.sendAPIRequest("shop/", null).subscribe(data => {
      this.items = data.payload
      console.log(data.payload)
    });
  }

}
