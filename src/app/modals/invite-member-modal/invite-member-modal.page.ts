import { Component, OnInit,ViewChild  } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InitCollab } from 'src/app/model/initCollabMem.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-invite-member-modal',
  templateUrl: './invite-member-modal.page.html',
  styleUrls: ['./invite-member-modal.page.scss'],
})
export class InviteMemberModalPage implements OnInit {
  @ViewChild('search', { static: false }) search: IonSearchbar;
  initCollab = new InitCollab(0,0,0);
  list: any[] = [];
  searchedItem: any;
  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public toastController: ToastController, public alertController: AlertController) { }

  ngOnInit() {
    this.initCollab.collab_room_id = this.data_service.currentCollabView.collab_room_id;
    console.log(this.initCollab.collab_room_id);
    this.getUsers();
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.search.setFocus();
    });
  }
  users:any;
  public getUsers(){
    this.data_service.sendAPIRequest(("user"), null)
    .subscribe(result=>{
      this.users = result.payload;
      this.list = this.users;
      console.log(this.list)
  });
  }

  members:any;
  isMember:boolean;
  checkIfMem(uid,name){
    this.isMember=false
    this.initCollab.user_id = uid;
    this.data_service.sendAPIRequest(("showCollabMembers"), null)
    .subscribe(result=>{
      this.members = result.payload;
      for(let mem of this.members){
        console.log(mem.user_id+", "+ mem.collab_room_id )
        if(this.initCollab.user_id == mem.user_id && this.initCollab.collab_room_id==mem.collab_room_id){
          this.presentToast(mem.user_name+" is already a member!")
          console.log(mem.user_name+" is already a member!")
          this.isMember=true;
          break;
        }
      }
      if(this.isMember==false){
        console.log(name+" invited!")

        this.inviteMem(uid, name);
      }
      console.log(this.members)
  });
  }

  collabSearch(event) {
    const val = event.target.value;

    this.searchedItem = this.list;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.user_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.search.getInputElement().then(item => console.log(item))
  }
  async inviteMem( uid, name){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      message: 'Invite <strong>'+name+'</strong>?',
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
            this.insertCollabMem();
            this.presentToast(name+" invited!")
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();


  }

  insertCollabMem(){
    this.data_service.sendAPIRequest(("initCollabMem/"), this.initCollab)
    .subscribe((result)=>{
      console.log(result);

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
    this.modalController.dismiss();
 }
}
