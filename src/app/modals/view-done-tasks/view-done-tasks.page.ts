import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-view-done-tasks',
  templateUrl: './view-done-tasks.page.html',
  styleUrls: ['./view-done-tasks.page.scss'],
})
export class ViewDoneTasksPage implements OnInit {

  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public toastController: ToastController) { }

  category:any
  count:number = 0;
  fitnessCount:number=0;
  workCount:number=0;
  schoolCount:number=0;
  othersCount:number=0;
  categoryBlank:boolean= false;
  categoryId:number;
  isCollab:boolean;
    ionViewDidEnter() {
      this.category=this.data_service.categ;
      if(this.data_service.DoneIsCollab == true)
      {
        this.isCollab = true
        this.getCollabTasks();
      }
      if(this.data_service.DoneIsCollab == false)
      {
        this.isCollab = false
        this.getTask();
      }


    }
  ngOnInit() {

  }


  checkCateg(){
    if(this.category == "Fitness" && this.fitnessCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 3
      this.count = this.fitnessCount
    }
    if(this.category == "School" && this.schoolCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 1
      this.count = this.schoolCount
    }
    if(this.category == "Work" && this.workCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 2
      this.count = this.workCount
    }
    if(this.category == "Others" && this.othersCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 4
      this.count = this.othersCount
    }
  }
  selectedData:any;

  getTask(){
    this.checkCateg()
    this.data_service.sendAPIRequest("showTasksDone/" + this.data_service.user_id+"/"+this.categoryId, null).subscribe(data => {
      this.selectedData = data.payload
      console.log(data)
    });
  }



  getCollabTasks(){
    this.data_service.sendAPIRequest("showCollabTasksDone/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.selectedData = data.payload
      console.log(data)
    });
  }
  CloseModal() {
    this.modalController.dismiss();
 }
}
