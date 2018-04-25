import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Item } from '../../providers/cart-service/item';
import { ItemService } from '../../providers/cart-service/cart-service';
import { CardPage } from '../../pages/card/card';
import { AddressPage } from '../../pages/address/address';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage  {
  quantity :any;
  cartItems: Item[] = [];
  // cartimage='http://192.168.1.68:3333/';
  // cartimage='http://139.153.62.240:3333/';
  cartimage='http://127.0.0.1:3333/s';
  item:Item;
  // private quantities: number[];
  

  constructor(private itemService: ItemService,public navCtrl: NavController, public navParams: NavParams) {
this.quantity=1;
  }

  
  getItemsForCart(): void {
       this.cartItems = this.itemService.getSelectedItems();
       console.log(this.getItemsForCart);
   console.log(this.cartItems);
  }
  ngOnInit(): void {
       this.getItemsForCart();
       console.log(this.getItemsForCart);
  }
  removeItemFromCart(id:string): void {
       this.itemService.removeItem(id);
  }
  getTotal(){
    let total = 0;
    for(var i = 0; i < this.cartItems.length; i++){
        var item = this.cartItems[i];
        var tax = (((item.price)* 0.12)*this.quantity);
        var delivery = (((item.price)*0.08)*this.quantity)
        total += (((item.price)* this.quantity)+tax+delivery);
    }
    return total;
}

  gotohome(): void{
    this.navCtrl.setRoot(HomePage);
  }
  details(): void{
    this.navCtrl.push(AddressPage);
  }


  // // // increment product qty
  // increment(item:number) {
  // console.log(this.quantity[item]+1);
  // this.quantity[item] += 1;
  // }
  
  // // decrement product qty
  // decrement() {
  // if(this.quantity-1 < 1 ){
  // this.quantity = 1
  // console.log('1->'+this.quantity);
  // }else{
  // this.quantity -= 1;
  // console.log('2->'+this.quantity);
  // }
  // }

ionViewDidLoad() {
console.log('ionViewDidLoad CartPage');
    
  }

}
