import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL="http://localhost/ITelective4-project/tama_api/"
  DoneIsCollab:any;
  categ_id:number;
  userLoggedIn:any;
  task_id:any;
  user_id:any = null;
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
  newlyusern:any;
  newlypword:any;
  constructor(private _http: HttpClient) { }

  clearAll(){
  this.DoneIsCollab= null;
  this.categ_id= null;
  this.userLoggedIn= null;
  this.task_id= null;
  this.user_id= null;
  this.currentCollabView= null;
  this.tasksCateg =[]
  this.categ= null;
  this.icon= null;
  this.room_id= null;
  this.fitnessCount= null;
  this.workCount= null;
  this.schoolCount= null;
  this.othersCount= null;
  this.task= null;
  this.newlyusern= null;
  this.newlypword= null;
  }

//AUTH
  public uid: string | null = null;
  checkStorage(){
    const uid = sessionStorage.getItem('uid');
    const udata = sessionStorage.getItem('userdata')
    this.user_id = uid
    if(udata){
      this.userLoggedIn = JSON.parse(udata) as any;
    }else{
      this.userLoggedIn = null


    }
  }

  isLoggedIn(){
    return this.user_id !== null
  }

  logout(){
    sessionStorage.clear();
    this.clearAll();
    this.checkStorage()
  }


  log(uid:any,userdata:any){
    sessionStorage.setItem('uid', uid);
    sessionStorage.setItem('userdata', JSON.stringify(userdata));

    this.checkStorage();
  }
//END AUTH
  sendAPIRequest(method:any, data:any) {
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
