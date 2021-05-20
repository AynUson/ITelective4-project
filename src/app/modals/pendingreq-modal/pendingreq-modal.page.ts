import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pendingreq-modal',
  templateUrl: './pendingreq-modal.page.html',
  styleUrls: ['./pendingreq-modal.page.scss'],
})
export class PendingreqModalPage implements OnInit {

  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public toastController: ToastController, public alertController: AlertController) { }

  ngOnInit() {
    this.getData();
  }
  async declineCollab(id,title){

    const alert = await this.alertController.create({
      cssClass: '',
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

            this.data_service.sendAPIRequest("deleteCollabReq/"+ id, null).subscribe(data => {
              console.log(data)
            });
            let index = this.selectedData.findIndex(x => x.member_rec_id ===id);
            this.selectedData.splice(index, 1);
            console.log(title+" mark as done!");
            console.log(index+" Index!");

          }
        }
      ]
    });

    await alert.present();

  }

  async acceptCollab(recID, name){

    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Are you sure?',
      message: 'Accept <strong>'+name+'</strong>?',
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

            let reqid = recID;
            let updateData : any = {};
            updateData.isAccepted = 1;
            this.data_service.sendAPIRequest2("acceptCollab/", updateData, reqid).subscribe(data => {
              console.log(data)
            });
            this.CloseModal();
            console.log(name+" collaboration is accepted!");

          }
        }
      ]
    });

    await alert.present();

  }

  isCreator:boolean = false;
  creator:any;
  creator_id:any;
  checkIfCreator(){
    this.data_service.sendAPIRequest("checkIfCreator/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.creator = data.payload
      for( let cr of this.creator){
        console.log("CR "+cr.user_id);
        this.creator_id =cr.user_id
      }
      if(this.data_service.user_id == this.creator_id){
        this.isCreator = true;
      }
    });
  }
  reqEmpty:boolean;
  selectedData: any[] = [];
  getData() {

    console.log(this.data_service.user_id)

    this.data_service.sendAPIRequest("showCollabJoin3/" + this.data_service.user_id, null).subscribe(data => {
      this.selectedData = data.payload
      if(this.selectedData.length <= 0){
        this.reqEmpty = true;
      }
      if(this.selectedData.length > 0){
        this.reqEmpty = false;
      }
      console.log(this.selectedData)
    });

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
    this.modalController.dismiss();
 }
}
