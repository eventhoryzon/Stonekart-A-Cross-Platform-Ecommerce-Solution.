import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { User } from '../../providers/admin-service/User';
/**
 * Generated class for the UseradminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-useradmin',
  templateUrl: 'useradmin.html',
})
export class UseradminPage {

  users : User[] = [];
  errorMessage:string;

  constructor(public adminservice: AdminServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  getUsers(): void {
    this.adminservice.getUsers().subscribe(
            data => this.users = data,
        error =>  this.errorMessage = <any>error);
 }
 ngOnInit(): void {
      this.getUsers();
 }

  removeUser(_id:string): void {
    let i = this.users.map(item => item._id).indexOf(_id) // find index of your object
    this.users.splice(i, 1) // remove it from array
//          let index = this.storeItems.indexOf[_id] 
// if(index!=-1){
//          this.storeItems.splice(index , 1);

       this.adminservice.removeuserfromlist(_id);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UseradminPage');
  }

}
