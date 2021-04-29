import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CollabtaskModalPage } from "../../../modals/collabtask-modal/collabtask-modal.page";
import { InviteMemberModalPage } from "../../../modals/invite-member-modal/invite-member-modal.page";
import {  AlertController, ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-collaboration-view',
  templateUrl: './collaboration-view.page.html',
  styleUrls: ['./collaboration-view.page.scss'],
})
export class CollaborationViewPage implements OnInit {
  user:any;
  user_id:any;
  room:any;
  level:any
  xp:any
  gold:any
  selectedData: any[] = [];
  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    this.level = this.user.user_level
    this.xp = this.user.user_xp
    this.gold = this.user.user_gold
    this.user_id=this.data_service.user_id;
    this.room = this.data_service.currentCollabView;
    console.log(this.data_service.currentCollabView.collab_room_id);
    this.getCollabTasks();
    this.getCollabMem();
  }
  async deleteTask(id,title){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'Delete <strong>'+title+'</strong>?',
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
            //Done task on task_tbl
            this.delete(id);

            this.data_service.sendAPIRequest("deleteTask/"+ id, null).subscribe(data => {
              console.log(data)
            });
            let index = this.selectedData.findIndex(x => x.task_id ===id);
            this.selectedData.splice(index, 1);
            console.log(title+" mark as done!");
            console.log(index+" Index!");

          }
        }
      ]
    });

    await alert.present();

  }

  delete(id){

    this.data_service.sendAPIRequest("deleteCollabTask/"+ id, null).subscribe(data => {
      console.log(data)
    });
  }

  async doneTask(id,title){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'Mark <strong>'+title+'</strong> as done?',
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
            //Done task on task_tbl
            let updateData : any = {};
            updateData.task_isDone = 1;
            this.data_service.sendAPIRequest2("doneTask/", updateData, id).subscribe(data => {
              console.log(data)
            });
            let index = this.selectedData.findIndex(x => x.task_id ===id);
            this.selectedData.splice(index, 1);
            console.log(title+" mark as done!");
            console.log(index+" Index!");

            //End Done task on task_tbl
            //Update Xp gold level
            this.updateUser();
          }
        }
      ]
    });

    await alert.present();

  }
  updateUser(){
    let doneXp = 10;
    let doneGold = 2;
    this.gold += doneGold
    this.xp += doneXp;

    let updateUser : any = {};

    updateUser.user_gold = this.gold;
    updateUser.user_xp = this.xp;
    updateUser.user_level = this.level;

    if(updateUser.user_xp > 100){
      this.level++;
      updateUser.user_level = this.level
      updateUser.user_xp = 0;
      console.log("You leveled Up!");
    }
    this.data_service.sendAPIRequest2("updateUser/", updateUser, this.user_id).subscribe(data => {
      console.log(data)
    });
    this.user.user_xp = this.xp
    this.user.user_gold = this.gold
    this.user.user_level = this.level

  }


  async OpenInviteModal() {
    // this.modalController.create(
    //   { component:ModalPage }).then((modalElement)=>{
    //   modalElement.present();
    // });
    let modal =await this.modalController.create({ component:InviteMemberModalPage });
    modal.onDidDismiss().then(()=>{
      this.getCollabTasks();
      this.getCollabMem();
    });
      modal.present();

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
  members:any;
  getCollabMem(){
    this.data_service.sendAPIRequest("showCollabMembers/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.members = data.payload
      console.log("MEMBERS: "+this.members )
    });
  }

  backCollab(){
    this.user = this.data_service.userLoggedIn;
    this.user_id=this.data_service.user_id;
    this.router.navigate(['/home/collaboration']);
  }

}
