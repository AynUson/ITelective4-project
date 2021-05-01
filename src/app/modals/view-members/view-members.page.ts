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

  ngOnInit() {
    this.getCollabMem();
  }
  members:any;
  getCollabMem(){
    this.data_service.sendAPIRequest("showCollabMembers/" + this.data_service.currentCollabView.collab_room_id, null).subscribe(data => {
      this.members = data.payload
      console.log("MEMBERS: "+this.members )
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
