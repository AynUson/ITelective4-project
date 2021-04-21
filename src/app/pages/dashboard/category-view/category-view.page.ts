import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['./category-view.page.scss'],
})
export class CategoryViewPage implements OnInit {
user:any;
user_id:any;
tasks: any[]=[]
category:any;
  constructor(private data_service: DataService,
    private router:Router) { }

  ngOnInit() {
    this.category=this.data_service.categ;
    this.user=this.data_service.userLoggedIn;
    this.user_id=this.data_service.user_id;
    this.tasks = this.data_service.tasksCateg;
    console.log(this.tasks);
    
  }
  backCollab(){
    // this.data_service.userLoggedIn=this.user ;
    // this.data_service.user_id=this.user_id;
    this.router.navigate(['/home/dashboard']);
  }
}
