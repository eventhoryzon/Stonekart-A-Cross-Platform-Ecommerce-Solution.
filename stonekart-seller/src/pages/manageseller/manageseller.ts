
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { Seller } from '../../providers/admin-service/Seller';


/**
 * Generated class for the ManagesellerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-manageseller',
  templateUrl: 'manageseller.html',
})
export class ManagesellerPage {

  sellers : Seller[] = [];
  errorMessage:string;

  constructor(public adminservice: AdminServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  getSellers(): void {
    this.adminservice.getSellers().subscribe(
            data => this.sellers = data,
        error =>  this.errorMessage = <any>error);
 }
 ngOnInit(): void {
      this.getSellers();
 }

  removeUser(_id:string): void {
    let i = this.sellers.map(item => item._id).indexOf(_id) // find index of your object
    this.sellers.splice(i, 1) // remove it from array
//          let index = this.storeItems.indexOf[_id] 
// if(index!=-1){
//          this.storeItems.splice(index , 1);

       this.adminservice.removesellerfromlist(_id);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UseradminPage');
  }

}
