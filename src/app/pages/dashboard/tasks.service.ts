import { Injectable } from '@angular/core';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


 private tasks: Tasks[] = [
  {
    id:'t1',
    title:'Wash dishes',
    description:'Morning and Afternoon'
  },
  {
    id:'t2',
    title:'Cook',
    description:'At 5pm'
  }
]
  constructor() { }


  getAllTasks() {
    return [...this.tasks];
  }

  getTask(taskid: string){
    return {...this.tasks.find(task =>{
      return task.id === taskid;
    })};
  }
}
