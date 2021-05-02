import { Component, OnInit } from '@angular/core';

import { UpdateTask } from '../../model/updateTask.model';
import { DataService } from '../../services/data.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.page.html',
  styleUrls: ['./view-task.page.scss'],
})
export class ViewTaskPage implements OnInit {
  updateTask = new UpdateTask('','');
  task_id:number;
  category_id:number;
  constructor(private ModalController:ModalController,private data_service: DataService,private router:Router, public toastController: ToastController,public loadingController: LoadingController, public alertController: AlertController) { }
  willUpdate:boolean = true;
  ionViewDidEnter() {
    console.log(this.data_service.task)
    this.task_id = this.data_service.task.task_id;
    this.category_id = this.data_service.task.category_id;
    this.updateTask.task_title = this.data_service.task.task_title;
    this.updateTask.task_description = this.data_service.task.task_description;
    this.oldTitle = this.updateTask.task_title
    this.oldDesc = this.updateTask.task_description
  }
  ngOnInit() {

  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  oldTitle:any
  oldDesc:any

  async update(){
    if(this.willUpdate==false){
      if(this.oldDesc != this.updateTask.task_description || this.oldTitle != this.updateTask.task_title ){
        const alert = await this.alertController.create({
          cssClass: '',
          header: 'Are you sure?',
          message: 'Update task?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: 'Okay',
              handler: () => {
                this.data_service.sendAPIRequest2("updateTask/", this.updateTask, this.task_id).subscribe(data => {
                  console.log(data)
                });
                this.CloseModal();
              }
            }
          ]
        });

        await alert.present();
      }
      else{
        this.presentToast("No changes!");
      }
    }
    if(this.willUpdate == true){
      this.willUpdate = false
    }

  }

  CloseModal() {
    this.ModalController.dismiss();
 }

}
