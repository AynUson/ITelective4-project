import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ViewMembersPage } from "../../modals/view-members/view-members.page";
import { ViewDoneTasksPage } from "../../modals/view-done-tasks/view-done-tasks.page";
@Component({
  selector: 'app-collab-popover',
  templateUrl: './collab-popover.component.html',
  styleUrls: ['./collab-popover.component.scss'],
})
export class CollabPopoverComponent implements OnInit {

  constructor(private popCtrl: PopoverController, private data_service: DataService,
    private router:Router, private modalController:ModalController, public alertController: AlertController, public toastController: ToastController,public loadingController: LoadingController) { }

  ngOnInit() {
    this.checkIfCreator()
  }
  ionViewDidEnter() {

  }


  dismissPopover() {
    this.popCtrl.dismiss({
      'fromPop': + ' Subscribed'
    });
  }

  async OpenViewMemModal() {
    let modal =await this.modalController.create({ component:ViewMembersPage });
    modal.onDidDismiss().then(()=>{
    });
      modal.present();
      this.dismissPopover()
  }
  async OpenDoneTasksModal() {
    this.data_service.DoneIsCollab = true;
    let modal =await this.modalController.create({ component:ViewDoneTasksPage });
    modal.onDidDismiss().then(()=>{
    });
      modal.present();
      this.dismissPopover()
  }

  async leaveRoom(){

    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Are you sure?',
      message: 'Leave Collaboration?',
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
            this.dismissPopover()
            this.data_service.sendAPIRequest("leaveRoom/"+ this.data_service.currentCollabView.collab_room_id+"/"+this.user_id, null).subscribe(data => {
              console.log(data)
            });
            this.loadLeave();
            this.router.navigate(['/home/collaboration']);

          }
        }
      ]
    });

    await alert.present();

  }

  async disbandRoom(){

    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Continue disband?',
      message: 'This action is irreversible!',
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
            this.dismissPopover()
            this.data_service.sendAPIRequest("deleteTaskOfCollab/"+ this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
              console.log(data)
            });
            this.data_service.sendAPIRequest("deleteMemOfCollab/"+ this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
              console.log(data)
            });
            this.data_service.sendAPIRequest("deleteCollab/"+ this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
              console.log(data)
            });
            this.loadDisband();
            this.router.navigate(['/home/collaboration']);

          }
        }
      ]
    });

    await alert.present();

  }

  async loadDisband(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Disbanding Collaboration...',
      duration: 3500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.presentToast("Collaboration Disbanded!")
  }

  async loadLeave(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Leaving Collaboration...',
      duration: 3500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.presentToast("Left the Collaboration!")
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


  isCreator:boolean = false;
  creator:any;
  creator_id:any;
  user_id:any;
  checkIfCreator(){
    this.data_service.sendAPIRequest("checkIfCreator/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.creator = data.payload
      for( let cr of this.creator){
        console.log("CR "+cr.user_id);
        this.creator_id =cr.user_id
      }
      this.user_id = this.data_service.user_id
      if(this.data_service.user_id == this.creator_id){
        this.isCreator = true;
        console.log(this.isCreator);
      }
    });
  }
}
