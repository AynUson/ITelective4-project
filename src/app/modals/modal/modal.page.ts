import { Component, OnInit } from '@angular/core';


import { AddTask } from '../../model/addTask.model';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  addTask = new AddTask(0,0,'','');
  constructor(private ModalController:ModalController,private data_service: DataService,private router:Router, public toastController: ToastController) { }

  ngOnInit() {
    this.addTask.user_id = this.data_service.user_id;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  category:any;


  createTask(){
    console.log(this.addTask)
    this.data_service.sendAPIRequest(("createTask/"), this.addTask)
          .subscribe((result)=>{
            console.log(result);
        });
      this.presentToast("Task created!")
      this.router.navigate(['/home/dashboard']);
      this.ModalController.dismiss();
  }

  CloseModal() {
     this.ModalController.dismiss();
  }

}
