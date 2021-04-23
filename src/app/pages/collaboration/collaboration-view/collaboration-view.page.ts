import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CollabtaskModalPage } from "../../../modals/collabtask-modal/collabtask-modal.page";
import {  ModalController } from '@ionic/angular';
@Component({
  selector: 'app-collaboration-view',
  templateUrl: './collaboration-view.page.html',
  styleUrls: ['./collaboration-view.page.scss'],
})
export class CollaborationViewPage implements OnInit {
  user:any;
  user_id:any;
  room:any;

  selectedData: any[] = [];
  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    this.user_id= this.data_service.user_id;
    this.room = this.data_service.currentCollabView;
    console.log(this.data_service.currentCollabView.collab_room_id);
    this.getCollabTasks();
    this.getCollabMem();
  }

  async OpenModal() {
    // this.modalController.create(
    //   { component:ModalPage }).then((modalElement)=>{
    //   modalElement.present();
    // });
    let modal =await this.modalController.create({ component:CollabtaskModalPage });
    modal.onDidDismiss().then(()=>{
      this.getCollabTasks();
      this.getCollabMem();
    });
      modal.present();

  }

  getCollabTasks(){
    this.data_service.sendAPIRequest("showCollabTasks/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.selectedData = data.payload
      console.log(data)
    });
  }

  getCollabMem(){
    this.data_service.sendAPIRequest("showCollabMembers/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      console.log(data.payload)
    });
  }

  backCollab(){
    this.user = this.data_service.userLoggedIn;
    this.user_id=this.data_service.user_id;
    this.router.navigate(['/home/collaboration']);
  }

}
