import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.page.html',
  styleUrls: ['./collaboration.page.scss'],
})
export class CollaborationPage implements OnInit {
  user:any;
  constructor(private data_service: DataService) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
  }

}
