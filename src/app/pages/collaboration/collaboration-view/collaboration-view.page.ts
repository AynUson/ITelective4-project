import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
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
    private router:Router) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    this.user_id= this.data_service.user_id;
    this.room = this.data_service.currentCollabView;
    console.log(this.data_service.currentCollabView.collab_room_id);
    this.getCollabTasks();
    this.getCollabMem();
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
