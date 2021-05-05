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
  constructor(private tasksService: TasksService, private data_service: DataService, private modalController:ModalController, private router:Router) {

    this.data_service.checkStorage()
   }




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

    ionViewWillEnter()  {

      this.getTasks();
      this.getData();
      this.filterTasks();
      this.getCateg();
      this.countReset();
    }

  ngOnInit():void {
    this.user=this.data_service.userLoggedIn;
    this.countReset();
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
  fitnessCount:number=this.data_service.fitnessCount;
  workCount:number=this.data_service.fitnessCount;
  schoolCount:number=this.data_service.fitnessCount;
  othersCount:number=this.data_service.fitnessCount;
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
    });
  }

  category:any[] =[];
  getCateg(){
    this.data_service.sendAPIRequest("task_category/", null).subscribe(data => {
      this.category = data.payload
    });
  }
  categoryTasks:any[]=[];
  categoryTaskOnView:any[]=[]




  viewCategory(categ, title, icon){
    this.categoryTaskOnView = []
    // console.log(this.data_service.user_id)
     console.log("Categ id "+categ.category_id)
     this.data_service.categ_id = categ.category_id
    this.data_service.sendAPIRequest("viewCategory/"+this.data_service.user_id, null).subscribe(data => {
      this.categoryTasks=data.payload;
      for(let task of this.categoryTasks){
        if(task.category_id == categ.category_id){
          this.categoryTaskOnView.push(task)
        }
      }
      this.data_service.schoolCount = this.schoolCount;
      this.data_service.workCount = this.workCount;
      this.data_service.fitnessCount = this.fitnessCount;
      this.data_service.othersCount = this.othersCount;
      this.data_service.tasksCateg = this.categoryTaskOnView;
      this.data_service.categ = title;
      this.data_service.icon = icon;
      this.router.navigate(['/home/dashboard/category-view']);
    });
  }



  public getTasks(){
    this.data_service.sendAPIRequest(("task"), null)
    .subscribe((result:any)=>{
      this.a =(result.payload);
  });
  }
// ON progress show tasks of the logged in user
  public filterTasks(){
    this.getTasks();
    for(let task of this.a){
      if(this.user.user_id == task.user_id){
        this.filteredTask = task;
      }
    }
  }

}
