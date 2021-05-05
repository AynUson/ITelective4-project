import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AddCollab } from 'src/app/model/addCollab.model';
import { InitCollab } from 'src/app/model/initCollabMem.model';
@Component({
  selector: 'app-collab-modal',
  templateUrl: './collab-modal.page.html',
  styleUrls: ['./collab-modal.page.scss'],
})
export class CollabModalPage implements OnInit {
  addCollab = new AddCollab(0,0,'','');
  initCollab = new InitCollab(0,0,1);
  constructor(private ModalController:ModalController,private data_service: DataService,private router:Router, public toastController: ToastController,public loadingController: LoadingController) { }

  ngOnInit() {
    this.addCollab.user_id = this.data_service.user_id;
    this.initCollab.user_id = this.data_service.user_id;
    this.roomCheck();
  }


  async create() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creating Collaboration...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.createCollab();
  }

  room_id:any;
  room:any;
  createCollab(){
    this.roomCheck();
    this.data_service.sendAPIRequest(("createCollab/"), this.addCollab)
          .subscribe((result)=>{
            //this.room = result.payload
            console.log(this.room);

        });

      this.initCollab.collab_room_id = this.room_id;
      this.initCollabMem();
      this.insertCollabMem();
      this.presentToast("Task created!")
      this.CloseModal()
  }

  roomCheck(){
    this.data_service.sendAPIRequest(("collab_room/"), null)
          .subscribe((result)=>{
            this.room = result.payload
            console.log(this.room);
        });
        for(let rm of this.room){
          this.room_id=rm.collab_room_id+1
          console.log(this.room_id)
        }
  }

  insertCollabMem(){
    this.data_service.sendAPIRequest(("initCollabMem/"), this.initCollab)
    .subscribe((result)=>{
      console.log(result);

  });
  }
  initCollabMem(){

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  CloseModal() {
    this.router.navigate(['/home/collaboration']);
    this.ModalController.dismiss();
 }
}
