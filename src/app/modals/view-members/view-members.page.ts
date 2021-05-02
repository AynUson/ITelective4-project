import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.page.html',
  styleUrls: ['./view-members.page.scss'],
})
export class ViewMembersPage implements OnInit {
  user:any;
  user_id:any;
  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public toastController: ToastController, public alertController: AlertController) { }
    ionViewDidEnter() {
      this.getCollabMem();
    this.checkIfCreator();

    }
  ngOnInit() {
    this.getCollabMem();
    this.checkIfCreator();
  }

  async deleteTask(id,name){

    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Are you sure?',
      message: 'Remove <strong>'+name+'</strong>?',
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

            this.data_service.sendAPIRequest("removeMem/"+ id, null).subscribe(data => {
              console.log(data)
            });
            let index = this.members.findIndex(x => x.member_rec_id ===id);
            this.members.splice(index, 1);
            console.log(name+" mark as done!");
            console.log(index+" Index!");

          }
        }
      ]
    });

    await alert.present();

  }




  members:any;
  getCollabMem(){
    this.data_service.sendAPIRequest("showCollabMembers/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.members = data.payload
      console.log("MEMBERS: "+this.members )
    });
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

  CloseModal() {
    this.modalController.dismiss();
 }

  backCollab(){
    this.modalController.dismiss();
    this.router.navigate(['/home/collaboration']);
  }
}
