import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../providers/cart-service/cart-service';
import { Item } from '../../providers/cart-service/item';

/**
 * Generated class for the ProdadminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prodadmin',
  templateUrl: 'prodadmin.html',
})
export class ProdadminPage {
  // image='http://192.168.1.68:3333/';
  image='http://127.0.0.1:3333/';
  // image='http://139.153.62.240:3333/';
  storeItems: Item[] = [];
  errorMessage: string;

  constructor(private itemService: ItemService,public navCtrl: NavController, public navParams: NavParams) {
    }
  
    getStoreItems(): void {
      this.itemService.getItems().subscribe(
          data => this.storeItems = data,
          error =>  this.errorMessage = <any>error);
   }
   ngOnInit(): void {
        this.getStoreItems();
   }
 
    removeProduct(_id:string): void {
      let i = this.storeItems.map(item => item._id).indexOf(_id) // find index of your object
      this.storeItems.splice(i, 1) // remove it from array
//          let index = this.storeItems.indexOf[_id] 
// if(index!=-1){
//          this.storeItems.splice(index , 1);

         this.itemService.removeitemfromlist(_id);
    }
  
  
  
    
  ionViewDidLoad() {
  console.log('ionViewDidLoad CartPage');
      
    }
  
  }
  
