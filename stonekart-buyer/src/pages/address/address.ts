import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController ,AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { OrderService } from '../../providers/order-service/order-service';  
import { Order } from '../../providers/order-service/order';   
import { Item } from '../../providers/cart-service/item';
import { ItemService } from '../../providers/cart-service/cart-service';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { ValidatorProvider } from '../../providers/validator/validator';
import { EmailValidator } from '../../../node_modules/ng-email-validation';
import {Http,Response} from '@angular/http';
/**
 * Generated class for the AddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  quantity :any;
  cartItems: Item[] = [];
  // cartimage='http://192.168.1.68:3333/';
  apiURL='http://139.153.62.240:3333/';
  // cartimage='http://127.0.0.1:3333';
  item:Item;
  loading: any;
  public orderform : FormGroup;
  constructor(private http:Http,private itemService: ItemService,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public orderformbuilder : FormBuilder,public orderService: OrderService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.orderform = orderformbuilder.group({
      'name' :['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])],
      'email' : ['', Validators.compose([Validators.required, EmailValidator.emailValidator])],
      'mobilenumber' :['', Validators.compose([Validators.required,Validators.minLength(10)])],
      'shippingAddress' :['', Validators.compose([Validators.required,Validators.minLength(15),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(50)])],
    })
  }
  sendOrder() {

    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (formData != null) { // a file was selected
            //append the key name 'imagepath' with the first file in the element
 
                formData.append('name',this.orderform.value.name);
                formData.append('email',this.orderform.value.email);
                formData.append('mobilenumber',this.orderform.value.mobilenumber);
                formData.append('shippingAddress',this.orderform.value.shippingAddress);
            //call the angular http method
            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(this.apiURL+'addtoorder', formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                  let alert = this.alertCtrl.create({
                    title: "Order Completed",
                    subTitle: "Your Order has been placed wait for an email shortly",
                    buttons: ['ok'],
                    cssClass: "alert"
                });
                alert.present();
                this.navCtrl.push(TabsPage);
            },
                (error) => alert(error))
          }
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
getItemsForCart(): void {
  this.cartItems = this.itemService.getSelectedItems();
  console.log(this.getItemsForCart);
console.log(this.cartItems);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

}
