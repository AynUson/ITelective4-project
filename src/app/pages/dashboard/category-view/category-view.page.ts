import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController, ToastController,ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ViewTaskPage } from "../../../modals/view-task/view-task.page";
import { ViewDoneTasksPage } from "../../../modals/view-done-tasks/view-done-tasks.page";
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['./category-view.page.scss'],
})
export class CategoryViewPage implements OnInit {
user:any;
level:any;
xp:any;
gold:any;
user_id:any;
tasks: any[]=[]
category:any;
category_id:number;
icon:any;
count:number = 0;
fitnessCount:number=0;
workCount:number=0;
schoolCount:number=0;
othersCount:number=0;
  constructor(private data_service: DataService,
    private router:Router, public alertController: AlertController, public toastController: ToastController, private modalController:ModalController) { }


  ionViewDidEnter() {
    this.getTask();
    this.checkIfBlank();
    console.log(this.tasks);
    for(let t of this.tasks){
      this.count++
    }
  }

  ngOnInit() {
    this.category_id = this.data_service.categ_id
    this.schoolCount=this.data_service.schoolCount;
    this.workCount=this.data_service.workCount;
    this.fitnessCount=this.data_service.fitnessCount;
    this.othersCount=this.data_service.othersCount;
    this.category=this.data_service.categ;
    this.icon = this.data_service.icon;
    this.user=this.data_service.userLoggedIn;
    this.level = this.user.user_level
    this.xp = this.user.user_xp
    this.gold = this.user.user_gold
    this.user_id=this.data_service.user_id;
    //this.tasks = this.data_service.tasksCateg;
    this.getTask();
    // this.checkIfBlank();
    // console.log(this.tasks);
    // for(let t of this.tasks){
    //   this.count++
    // }
  }




  getTask(){
    this.data_service.sendAPIRequest("showTasksCateg/" + this.user_id+"/"+this.category_id, null).subscribe(data => {
      this.tasks = data.payload
      console.log(data)
    });
  }

  // getUser(){
  //   this.data_service.sendAPIRequest("user/"+this.data_service.user_id, null).subscribe(data => {
  //     console.log("User: "+ data)
  //     this.user = data.payload
  //     this.level = this.user.user_level
  //     this.xp = this.user.user_xp
  //     this.gold = this.user.user_gold
  //   }
  //   );
  // }


  async OpenDoneTasksModal() {
    this.data_service.DoneIsCollab = false;
    let modal =await this.modalController.create({ component:ViewDoneTasksPage });
    modal.onDidDismiss().then(()=>{
      this.getTask();
    });
      modal.present();

  }

  async OpenViewTasksModal(task) {
    this.data_service.DoneIsCollab = false;
    console.log(task)
    this.data_service.task = task
    let modal =await this.modalController.create({ component:ViewTaskPage });
    modal.onDidDismiss().then(()=>{
      this.getTask();
    });
      modal.present();
  }

  async deleteTask(id,title){
    // task_isDone=0(not done)
    // task_isDone=1(done)
    // task_isDone=2(deleted)???
    // appied delete query
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Are you sure?',
      message: 'Delete <strong>'+title+'</strong>?',
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
            //Done task on task_tbl
            let updateData : any = {};
            updateData.task_isDone = 2;
            this.data_service.sendAPIRequest("deleteTask/"+ id, null).subscribe(data => {
              console.log(data)
            });
            let index = this.tasks.findIndex(x => x.task_id ===id);
            this.tasks.splice(index, 1);
            console.log(title+" deleted!");
            console.log(index+" Index!");
            this.checkIfBlank();
            this.count = 0
            for(let t of this.tasks){
              this.count++
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async doneTask(id,title){
    // task_isDone=0(not done)
    // task_isDone=1(done)
    // task_isDone=2(deleted)
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Are you sure?',
      message: 'Mark <strong>'+title+'</strong> as done?',
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
            //Done task on task_tbl
            let updateData : any = {};
            updateData.task_isDone = 1;
            this.data_service.sendAPIRequest2("doneTask/", updateData, id).subscribe(data => {
              console.log(data)
            });
            let index = this.tasks.findIndex(x => x.task_id ===id);
            this.tasks.splice(index, 1);
            console.log(title+" mark as done!");
            console.log(index+" Index!");
            this.checkIfBlank();
            this.count = 0
            for(let t of this.tasks){
              this.count++
            }

            //End Done task on task_tbl
            //Update Xp gold level
            this.updateUser();
          }
        }
      ]
    });

    await alert.present();

  }
  updateUser(){
    let doneXp = 10;
    let doneGold = 2;
    this.gold += doneGold
    this.xp += doneXp;

    let updateUser : any = {};

    updateUser.user_gold = this.gold;
    updateUser.user_xp = this.xp;
    updateUser.user_level = this.level;

    if(updateUser.user_xp > 100){
      this.level++;
      updateUser.user_level = this.level
      updateUser.user_xp = 0;
      console.log("You leveled Up!");
    }
    this.data_service.sendAPIRequest2("updateUser/", updateUser, this.user_id).subscribe(data => {
      console.log(data)
    });
    this.user.user_xp = this.xp
    this.user.user_gold = this.gold
    this.user.user_level = this.level
    this.checkIfBlank();

  }


  categoryId: number;
  categoryBlank:boolean= false;
  checkIfBlank(){
    if(this.category == "Fitness" && this.fitnessCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 3
      this.count = this.fitnessCount
    }
    if(this.category == "School" && this.schoolCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 1
      this.count = this.schoolCount
    }
    if(this.category == "Work" && this.workCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 2
      this.count = this.workCount
    }
    if(this.category == "Others" && this.othersCount == 0 ){
      this.categoryBlank=true
      this.categoryId = 4
      this.count = this.othersCount
    }

    console.log(this.count)
  }

  backCollab(){
    // this.data_service.userLoggedIn=this.user ;
    // this.data_service.user_id=this.user_id;
    if(this.category == "Fitness"){
      this.data_service.fitnessCount=this.count
    }
    if(this.category == "School"){
      this.data_service.schoolCount=this.count
    }
    if(this.category == "Work"){
      this.data_service.workCount=this.count
    }
    if(this.category == "Others"){
      this.data_service.othersCount=this.count
    }
    this.router.navigate(['/home/dashboard']);
  }
}
