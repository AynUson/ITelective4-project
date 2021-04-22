import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTask } from '../model/addTask.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  addTask = new AddTask(0,0,'','');
  constructor(private ModalController:ModalController,private data_service: DataService,private router:Router) { }
  fitnessCount:number=0;
  workCount:number=0;
  schoolCount:number=0;
  othersCount:number=0;
  ngOnInit() {
    this.addTask.user_id = this.data_service.user_id;
    this.fitnessCount=this.data_service.fitnessCount;
    this.workCount=this.data_service.workCount;
    this.schoolCount=this.data_service.schoolCount;
    this.othersCount=this.data_service.othersCount;
  }
  category:any;
  newCount:any;
  createTask(){
    console.log(this.addTask)
    this.data_service.sendAPIRequest(("createTask/"), this.addTask)
          .subscribe((result)=>{
            console.log(result);
        });
      // if(this.addTask.category_id == 1){
      //   this.schoolCount++;
      //   this.newCount = this.schoolCount;
      //   this.category = "School";
      // }
      // if(this.addTask.category_id == 2){
      //   this.workCount++;
      //   this.newCount = this.workCount;
      //   this.category = "Work";
      // }
      // if(this.addTask.category_id == 3){
      //   this.fitnessCount++;
      //   this.newCount = this.fitnessCount;
      //   this.category = "Fitness";
      // }
      // if(this.addTask.category_id == 4){
      //   this.othersCount++;
      //   this.newCount = this.othersCount;
      //   this.category = "Others";
      // }
      // this.data_service.othersCount=this.othersCount;
      // this.data_service.schoolCount=this.schoolCount;
      // this.data_service.fitnessCount=this.fitnessCount;
      // this.data_service.workCount=this.workCount;
      this.router.navigate(['/home/dashboard']);
      this.ModalController.dismiss();
  }

  CloseModal() {
     this.ModalController.dismiss();
  }

}
