import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {  ModalController } from '@ionic/angular';
import { CollabModalPage } from "../../modals/collab-modal/collab-modal.page";

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.page.html',
  styleUrls: ['./collaboration.page.scss'],
})
export class CollaborationPage implements OnInit {
  user:any;
  constructor(private data_service: DataService,
    private router:Router,private modalController:ModalController) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    this.getData();
  }

  selectedData: any[] = [];

  getData() {
    console.log(this.data_service.user_id)
    this.data_service.sendAPIRequest("showCollabJoin/" + this.data_service.user_id, null).subscribe(data => {
      this.selectedData = data.payload
      console.log(this.selectedData)
    });
  }

  selectRoom(room){
    this.data_service.currentCollabView = room;
    this.router.navigate(['/home/collaboration/collaboration-view']);
  }

  async OpenModal() {
    // this.modalController.create(
    //   { component:ModalPage }).then((modalElement)=>{
    //   modalElement.present();
    // });
    let modal =await this.modalController.create({ component:CollabModalPage });
    modal.onDidDismiss().then(()=>{
      this.getData();
    });
      modal.present();

  }
}
