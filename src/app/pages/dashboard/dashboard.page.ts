import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
import { DataService } from '../../services/data.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{
 slidesOptions = {
    slidesPerView: 1.15
  }
  tbcolor = "secondary";
  colors = ["primary", "secondary","danger","dark"];
  randomNum = 0;
  task: Tasks[];
  a: any[]=[];
  user: any;
  filteredTask: any[]=[];
  changeTbColor(){
    this.randomNum = Math.floor(Math.random()*this.colors.length);

    this.tbcolor = this.colors[this.randomNum];
  }
  constructor(private tasksService: TasksService, private data_service: DataService) { }



  ngOnInit():void {
    this.task = this.tasksService.getAllTasks();
    this.user=this.data_service.userLoggedIn;
    console.log(this.user);
    console.log("User id: "+this.data_service.user_id)
    this.getTasks();
    this.getData();
    this.filterTasks();
  }

  selectedData: any[] = [];

  getData() {
    console.log(this.data_service.user_id)
    this.data_service.sendAPIRequest("task/" + this.data_service.user_id, null).subscribe(data => {
      this.selectedData = data.payload
      console.log(this.selectedData)
    })
  }
  public getTasks(){
    this.data_service.sendAPIRequest(("task"), null)
    .subscribe((result:any)=>{
      this.a =(result.payload);
      console.log("TASKS: "+this.a)
  });
  }
// ON progress show tasks of the logged in user
  public filterTasks(){
    this.getTasks();
    console.log("TASKS: "+this.a);
    for(let task of this.a){
      console.log(this.user.user_id);
      if(this.user.user_id == task.user_id){
        this.filteredTask = task;
      }
    }
  }

}
