import { Component, OnInit } from '@angular/core';
import { AddCollabTask } from '../../model/addCollabTask.model';
import { AddCollabTask2 } from '../../model/addCollabTask2.model';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-collabtask-modal',
  templateUrl: './collabtask-modal.page.html',
  styleUrls: ['./collabtask-modal.page.scss'],
})
export class CollabtaskModalPage implements OnInit {
  addCollabTask = new AddCollabTask(0,0,'','',1);
  addCollabTask2 = new AddCollabTask2(0,0);
  constructor(private ModalController:ModalController,private data_service: DataService,private router:Router, public toastController: ToastController) { }

  ngOnInit() {

    this.addCollabTask.user_id = this.data_service.user_id;
    console.log(this.data_service.currentCollabView.collab_room_id);
    this.taskCheck();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  createTask(){
    this.taskCheck();
    console.log(this.addCollabTask)
    this.data_service.sendAPIRequest(("createTask/"), this.addCollabTask)
          .subscribe((result)=>{
            console.log(result);
        });
      this.addCollabTask2.collab_room_id = this.data_service.currentCollabView.collab_room_id
      this.addCollabTask2.task_id = this.task_id;
      console.log("TASK ID: "+this.addCollabTask2.task_id );
      this.insertCollabTask();
      this.presentToast("Task created!")
      this.router.navigate(['/home/collaboration/collaboration-view']);
      this.ModalController.dismiss();
  }
  task:any;
  task_id:any;
  taskCheck(){
    this.data_service.sendAPIRequest(("task/"), null)
          .subscribe((result)=>{
            this.task = result.payload
            console.log(this.task);
        });
        for(let tsk of this.task){
          this.task_id=tsk.task_id
          console.log(this.task_id)
        }
  }


  insertCollabTask(){
    this.data_service.sendAPIRequest(("collabtask/"), this.addCollabTask2)
          .subscribe((result)=>{
            console.log(result);
        });
  }

  CloseModal() {
    this.ModalController.dismiss();
 }
}
