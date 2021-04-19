import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
import { DataService } from '../../services/data.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 slidesOptions = {
    slidesPerView: 1.15
  }
  tbcolor = "secondary";
  colors = ["primary", "secondary","danger","dark"];
  randomNum = 0;
  task: Tasks[];
  a: any;
  changeTbColor(){
    this.randomNum = Math.floor(Math.random()*this.colors.length);

    this.tbcolor = this.colors[this.randomNum];
  }
  constructor(private tasksService: TasksService, private data_service: DataService) { }

  ngOnInit() {
    this.task = this.tasksService.getAllTasks();
    this.getTasks();
  }

  public getTasks(){
    this.data_service.sendAPIRequest(("task/"), null)
    .subscribe(result=>{
      this.a = result.payload;
      console.log(this.a)
  });
  }

}
