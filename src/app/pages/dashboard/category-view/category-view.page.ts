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
icon:any;
count:number = 0;
fitnessCount:number=0;
workCount:number=0;
schoolCount:number=0;
othersCount:number=0;
  constructor(private data_service: DataService,
    private router:Router) { }


  ngOnInit() {

    this.schoolCount=this.data_service.schoolCount;
    this.workCount=this.data_service.workCount;
    this.fitnessCount=this.data_service.fitnessCount;
    this.othersCount=this.data_service.othersCount;
    this.category=this.data_service.categ;
    this.icon = this.data_service.icon;
    this.user=this.data_service.userLoggedIn;
    this.user_id=this.data_service.user_id;
    this.tasks = this.data_service.tasksCateg;
    this.checkIfBlank();
    console.log(this.tasks);
    for(let t of this.tasks){
      this.count++
    }
  }


  categoryBlank:boolean= false;
  checkIfBlank(){
    if(this.category == "Fitness" && this.fitnessCount == 0 ){
      this.categoryBlank=true
      this.count = this.fitnessCount
    }
    if(this.category == "School" && this.schoolCount == 0 ){
      this.categoryBlank=true
      this.count = this.schoolCount
    }
    if(this.category == "Work" && this.workCount == 0 ){
      this.categoryBlank=true
      this.count = this.workCount
    }
    if(this.category == "Others" && this.othersCount == 0 ){
      this.categoryBlank=true
      this.count = this.othersCount
    }
    console.log(this.count)
  }

  backCollab(){
    // this.data_service.userLoggedIn=this.user ;
    // this.data_service.user_id=this.user_id;
    this.router.navigate(['/home/dashboard']);
  }
}
