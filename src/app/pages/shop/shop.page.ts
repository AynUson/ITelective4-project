import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  user:any;
  images:any
  category:number;
  name:any;
  price:any;
  selectedSegment:any = 'headdress';
  constructor(private router: Router,private data_service: DataService, public toastController: ToastController) { }

  ngOnInit() {
    this.user=this.data_service.userLoggedIn;
    console.log(this.data_service.userLoggedIn.user_id)
    this.getUserInv();
    this.getItem();

  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    this.selectedSegment = ev.target.value
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  //default theme id 1
  //default head id 30
   //default icon id 31
  // uploadItem: any = {};
  //DONT DELETE
  // upload(){
  //   this.uploadItem.item_category_id = this.category
  //   this.uploadItem.item_name = this.name
  //   this.uploadItem.item_price = this.price
  //   this.uploadItem.item_property = this.imgSrc
  //   console.log(this.uploadItem)
  //   this.data_service.sendAPIRequest(("createItem/"), this.uploadItem)
  //         .subscribe((result)=>{
  //           console.log(result);
  //           this.presentToast("Item created!")
  //       });
  // }

  // imgSrc: string = "../../assets/hatch.png"
  // imageToUpload: any;

  // onUploadHandler(file: any) {
  //   this.imageToUpload = file.target.files[0];
  //   console.log(this.imageToUpload.name)
  // //  console.log(this.imageToUpload.name,this.imageToUpload.type,this.imageToUpload.size);
  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imgSrc = event.target.result;
  //   }
  //   reader.readAsDataURL(this.imageToUpload);
  // }
  
  owned:boolean;
  updateUser:any = {};
  toBeBought: any = {};
  buyItem(id,prc){
    if(prc > this.user.user_gold){
      this.presentToast("Not enough currency!")
    }else{
      this.updateUser.user_gold = this.user.user_gold - prc
      this.toBeBought.item_id = id
      this.toBeBought.user_id = this.data_service.userLoggedIn.user_id
      this.owned = false
      //check if already have
      for(let inv of this.inventory){
        if(id == inv.item_id){
          this.owned = true
          break;
        }
      }
      if(this.owned == false){
        //insert to db
        this.data_service.sendAPIRequest2("updateUser/", this.updateUser, this.data_service.userLoggedIn.user_id).subscribe(data => {
          this.user.user_gold = this.updateUser.user_gold;
          console.log(data)
        });
        this.data_service.sendAPIRequest("buyItem/", this.toBeBought).subscribe(data => {
          console.log(data)
          this.getUserInv();
          this.getItem();
          this.presentToast("Item bought!")
        });

      }else{
        //show toast
        this.presentToast("Already Owned!")
      }
    }

  }

  owneditem(){
    this.presentToast("Already Owned!")
  }

  inventory:any;
  getUserInv(){
    this.data_service.sendAPIRequest("user_inventory/"+this.data_service.userLoggedIn.user_id, null).subscribe(data => {
      this.inventory = data.payload
      console.log(this.inventory)
    });
  }


  items:any[] =[];
  themes:any[] =[];
  headdress:any[] =[];
  icons:any[] =[];

  getItem(){
    this.data_service.sendAPIRequest("shop/", null).subscribe(data => {
      this.items = data.payload
      for(let item of this.items){
        if(item.item_category_id == 1){
          this.themes.push(item)
        }
        if(item.item_category_id == 2){
          this.headdress.push(item)
        }
        if(item.item_category_id == 3){
          this.icons.push(item)
        }
      }
      console.log(data.payload)
    });
  }

}
