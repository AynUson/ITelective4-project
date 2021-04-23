import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
import {  ModalController } from '@ionic/angular';
import { ModalPage } from "../../modals/modal/modal.page";
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{


 slidesOptions = {
    slidesPerView: 1.15
  }
  tbcolor = "secondary";
  colors = ["primary", "secondary","danger","dark"];
  randomNum = 0;
  task: Tasks[];
  a: any[]=[];

  user: any;
  filteredTask: any[]=[];
  changeTbColor(){
    this.randomNum = Math.floor(Math.random()*this.colors.length);

    this.tbcolor = this.colors[this.randomNum];
  }
  constructor(private tasksService: TasksService, private data_service: DataService, private modalController:ModalController, private router:Router) {  }

    async OpenModal() {
      // this.modalController.create(
      //   { component:ModalPage }).then((modalElement)=>{
      //   modalElement.present();
      // });
      let modal =await this.modalController.create({ component:ModalPage });
      modal.onDidDismiss().then(()=>{
        this.getData();
        this.countReset();
      });
        modal.present();

    }

  ngOnInit():void {
    this.user=this.data_service.userLoggedIn;
    this.getTasks();
    this.getData();
    this.filterTasks();
    this.getCateg();
  }

  selectedData: any[] = [];
  countReset(){
    this.fitnessCount=0;
    this.workCount=0;
    this.schoolCount=0;
    this.othersCount=0;
  }
  fitnessCount:number=0;
  workCount:number=0;
  schoolCount:number=0;
  othersCount:number=0;
  getData() {
    console.log(this.data_service.user_id)
    this.data_service.sendAPIRequest("task/" + this.data_service.user_id, null).subscribe(data => {
      this.selectedData = data.payload
      for(let task of this.selectedData){
        if(task.category_id == 1){
          this.schoolCount++;
        }
        if(task.category_id == 2){
          this.workCount++;
        }
        if(task.category_id == 3){
          this.fitnessCount++;
        }
        if(task.category_id == 4){
          this.othersCount++;
        }
      }
      console.log(this.selectedData)
    });
  }

  category:any[] =[];
  getCateg(){
    this.data_service.sendAPIRequest("task_category/", null).subscribe(data => {
      this.category = data.payload
      console.log(data.payload)
    });
  }
  categoryTasks:any[]=[];
  categoryTaskOnView:any[]=[]




  viewCategory(categ, title){
    this.categoryTaskOnView = []
    // console.log(this.data_service.user_id)
    // console.log(categ.category_id)
    this.data_service.sendAPIRequest("viewCategory/"+this.data_service.user_id, null).subscribe(data => {
      this.categoryTasks=data.payload;
      for(let task of this.categoryTasks){
        if(task.category_id == categ.category_id){
          this.categoryTaskOnView.push(task)
          console.log(task.task_title);
        }
      }
      this.data_service.schoolCount = this.schoolCount;
      this.data_service.workCount = this.workCount;
      this.data_service.fitnessCount = this.fitnessCount;
      this.data_service.othersCount = this.othersCount;
      console.log(this.categoryTaskOnView)
      this.data_service.tasksCateg = this.categoryTaskOnView;
      this.data_service.categ = title;
      this.router.navigate(['/home/dashboard/category-view']);
      console.log("CATEG TITLE :"+title)
    });
  }



  public getTasks(){
    this.data_service.sendAPIRequest(("task"), null)
    .subscribe((result:any)=>{
      this.a =(result.payload);
      console.log("TASKS: "+this.a)
  });
  }
// ON progress show tasks of the logged in user
  public filterTasks(){
    this.getTasks();
    console.log("TASKS: "+this.a);
    for(let task of this.a){
      console.log(this.user.user_id);
      if(this.user.user_id == task.user_id){
        this.filteredTask = task;
      }
    }
  }

}
