import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL="http://localhost/TAMA/tama_api/"
  DoneIsCollab:any;
  categ_id:number;
  userLoggedIn:any;
  task_id:any;
  user_id:number;
  currentCollabView:any;
  tasksCateg: any[]=[]
  categ:any;
  icon:any;
  room_id:any;
  fitnessCount:number=0;
  workCount:number=0;
  schoolCount:number=0;
  othersCount:number=0;
  task:any;
  constructor(private _http: HttpClient) { }


  sendAPIRequest(method:any, data:any) {
    console.log(data)
    return <any>(
      this._http.post(this.baseURL + method, (JSON.stringify(data)))
    );
  }

  sendAPIRequest2(method, data, condition) {
    return <any>(
      this._http.post(this.baseURL + method + condition, JSON.stringify(data))
    );
  }

  sendAPIRequest3(method, data, condition, condition2) {
    return <any>(
      this._http.post(this.baseURL + method + condition +'/'+condition2, JSON.stringify(data))
    );
  }
}
