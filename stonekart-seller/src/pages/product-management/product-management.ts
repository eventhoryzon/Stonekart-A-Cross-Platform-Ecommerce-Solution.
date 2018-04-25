import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { ValidatorProvider } from '../../providers/validator/validator';
import { EmailValidator } from '../../../node_modules/ng-email-validation';
import {AddproductPage} from '../addproduct/addproduct';
import { ProdadminPage } from '../prodadmin/prodadmin';
import { UseradminPage } from '../useradmin/useradmin';
import { ManagesellerPage } from '../manageseller/manageseller';
import { MessagesPage} from '../messages/messages';
/**
 * Generated class for the ProductManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-management',
  templateUrl: 'product-management.html',
})
export class ProductManagementPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,public addinventoryformbuilder : FormBuilder,public fb : FormBuilder, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  
  }

  gotoaddproduct() {
    this.navCtrl.push(AddproductPage);
  }
  gotoProducts(){
    this.navCtrl.push(ProdadminPage);
  }
  gotoUsers(){
    this.navCtrl.push(UseradminPage);
  }
  gotoSellers(){
    this.navCtrl.push(ManagesellerPage);
  }
  gotoMessages(){
    this.navCtrl.push(MessagesPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductManagementPage');
  }

}
