import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {  ModalController } from '@ionic/angular';
import { CollabModalPage } from "../../modals/collab-modal/collab-modal.page";
import { PendingreqModalPage } from "../../modals/pendingreq-modal/pendingreq-modal.page";

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.page.html',
  styleUrls: ['./collaboration.page.scss'],
})
export class CollaborationPage implements OnInit {
  user:any;
  constructor(private data_service: DataService,
    private router:Router,private modalController:ModalController) {

     }

  ngOnInit() {
    this.data_service.checkStorage()
    this.user=this.data_service.userLoggedIn;
    this.getData();
    this.pendingReq = 0;
  }

  ionViewDidEnter() {
    this.data_service.checkStorage()
    this.user=this.data_service.userLoggedIn;
    this.getData();
    this.pendingReq = 0;
  }
  acceptedCollab: any[] = [];
  selectedData: any[] = [];
  pendingReq:number = 0;
  collabEmpty:boolean = false;
  getData() {
    this.pendingReq = 0;
    console.log(this.data_service.user_id)

    this.data_service.sendAPIRequest("showCollabJoin/" + this.data_service.user_id, null).subscribe(data => {
      this.selectedData = data.payload
      for(let data of this.selectedData){
        if(data.isAccepted == 0){
          this.pendingReq++;
        }
      }
      console.log(this.pendingReq)
      console.log(this.selectedData)

    });

    this.data_service.sendAPIRequest("showCollabJoin2/" + this.data_service.user_id, null).subscribe(data => {
      this.acceptedCollab = data.payload
      console.log(this.acceptedCollab)
      if(this.acceptedCollab.length > 0){
        this.collabEmpty = false;
      }
      if(this.acceptedCollab.length <= 0){
        this.collabEmpty = true;
      }
    });
  }

  selectRoom(room){
    this.data_service.currentCollabView = room;
    this.router.navigate(['/home/collaboration/collaboration-view']);
  }

  async toPendingreq() {
    // this.modalController.create(
    //   { component:ModalPage }).then((modalElement)=>{
    //   modalElement.present();
    // });
    let modal =await this.modalController.create({ component:PendingreqModalPage });
    modal.onDidDismiss().then(()=>{
      this.getData();
      this.pendingReq = 0;
    });
      modal.present();

  }


  async OpenModal() {
    // this.modalController.create(
    //   { component:ModalPage }).then((modalElement)=>{
    //   modalElement.present();
    // });
    let modal =await this.modalController.create({ component:CollabModalPage });
    modal.onDidDismiss().then(()=>{
      this.getData();
      this.pendingReq = 0;
    });
      modal.present();

  }
}
