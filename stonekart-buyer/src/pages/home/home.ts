import { Component,OnInit } from '@angular/core';
import { NavController, App, AlertController} from 'ionic-angular';
import { FormControl } from '@angular/forms';
import {AuthService} from '../../providers/auth-service/auth-service';
import {Login} from '../login/login';
import { ProdService } from '../../providers/prod-service/prod-service';
import { CartPage } from '../../pages/cart/cart';
import { ItemService } from '../../providers/cart-service/cart-service';
import { Item } from '../../providers/cart-service/item';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  isLoggedIn : boolean
  storeItems: Item[] = [];
  errorMessage: string;
  private isOn: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(public itemservice:ItemService,public alertCtrl: AlertController,public navCtrl: NavController, public app: App,public authservice:AuthService,public prodservice : ProdService,public _app: App) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.searchControl = new FormControl();
      
    }
  }
ionViewDidLoad() {
    
           this.setFilteredItems();
    
           this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    
               this.searching = false;
               this.setFilteredItems();
    
           });
    
    
       }

       onSearchInput(){
        this.searching = true;
    }
  getStoreItems(): void {
    this.itemservice.getItems().subscribe(
            data => this.storeItems = data,
        error =>  this.errorMessage = <any>error);
 }
 ngOnInit(): void {
      this.getStoreItems();
 }


 addItemInCart(_id:string): void {
    this.itemservice.addItem(_id);
    if(_id) {
      let alert = this.alertCtrl.create({
          title: "Added to Cart",
          subTitle: "Your Item has been added to the cart",
          buttons: ['ok'],
          cssClass: "alert"
      });
      alert.present();
  } 
    console.log(_id);
    console.log(this.itemservice.addItem(_id));
 }


 setFilteredItems() {

         this.storeItems = this.itemservice.filterItems(this.searchTerm);
 }


showToken(){
  let TOK = localStorage.getItem("token");
  return TOK;
}
    logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logout!',
      message: 'Are you sure you want to logout you will delete your token.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Nothing');
          }
        },
        {
          text: 'Yes',
          handler: () => {
        this.authservice.logout();
        this._app.getRootNav().setRoot(Login);
            console.log('Wants to logout');
          }
        }
      ]
    });
    confirm.present();
  }


  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }

  doRefresh(refresher) {
    this.getStoreItems();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

toggleDetails() {
    this.isOn = !this.isOn;
  }
}








