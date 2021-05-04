import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { AlertController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-view-owned',
  templateUrl: './view-owned.page.html',
  styleUrls: ['./view-owned.page.scss'],
})
export class ViewOwnedPage implements OnInit {

  selectedSegment:any = 'headdress';
  constructor(private data_service: DataService,
    private router:Router, private modalController:ModalController, public toastController: ToastController, public alertController: AlertController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getOwned()
    this.getEquiped()
  }

  CloseModal() {
    this.modalController.dismiss();
 }

 doneEquip:boolean = false;
 async equipLoad(categId,name,ownedId) {
  this.doneEquip=false;
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Changing Equipment...',
    duration: 10000,
    spinner:"circular"
  });
  await loading.present();
  this.equip(categId,name,ownedId)
  console.log('Loading dismissed!');
}
async dismiss() {
  this.doneEquip = true;
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  this.doneEquip = false;
}

 async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
    position: 'bottom'
  });
  toast.present();
}

 segmentChanged(ev: any) {
  console.log('Segment changed', ev.target.value);
  this.selectedSegment = ev.target.value
}


  updateUnEquip:any = {}
  updateEquip:any = {}
 equip(categId,name,ownedId){
  console.log(categId,name)
  console.log(ownedId)
  this.updateUnEquip.isEquiped = 0
  this.updateEquip.isEquiped = 1
  this.data_service.sendAPIRequest3("unEquipAll/", this.updateUnEquip, this.data_service.userLoggedIn.user_id,categId).subscribe(data => {
    console.log(data)
    this.data_service.sendAPIRequest2("equip/", this.updateEquip, ownedId).subscribe(data => {
      console.log(data)
      this.getEquiped()
      this.doneEquip=true;
      this.presentToast("Equiped!")
      this.dismiss()
    });
  });





 }

 equipedProp:any="";
 equipedTheme:any;
 equipedProfile:any
 equipedHeaddress:any
 equipedThemeId:any;
 equipedProfileId:any
 equipedHeaddressId:any
 equips:any
 getEquiped(){
  this.data_service.sendAPIRequest("getEquiped/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
    this.equips = data.payload
    console.log(this.equips)
    for(let eq of this.equips){
      if(eq.item_category_id == 1){
        this.equipedTheme = eq.item_name
        this.equipedProp = eq.item_property
        this.equipedThemeId = eq.item_id

        console.log("Property: "+this.equipedProp)

      }
      if(eq.item_category_id == 2){
        this.equipedHeaddress = eq.item_property
        this.equipedHeaddressId = eq.item_id
      }
      if(eq.item_category_id == 3){
        this.equipedProfile = eq.item_property
        this.equipedProfileId = eq.item_id
      }

    }
  });
}
  themes:any[] =[];
  headdress:any[] =[];
  icons:any[] =[];
 ownedItems:any;
 ownedCount:any = 0;
 getOwned(){
   this.themes = []
   this.headdress = []
   this.icons = []
   this.data_service.sendAPIRequest("getOwned/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
     this.ownedItems = data.payload
     console.log(this.ownedItems )
     for(let item of this.ownedItems){
       this.ownedCount++
       if(item.item_category_id == 1){
        this.themes.push(item)
      }
      if(item.item_category_id == 2){
        this.headdress.push(item)
      }
      if(item.item_category_id == 3){
        this.icons.push(item)
      }
       console.log(item.item_name )
     }
   });
 }
}
