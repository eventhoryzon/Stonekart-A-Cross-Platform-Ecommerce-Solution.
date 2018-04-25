import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { Message } from '../../providers/admin-service/Message';

/**
 * Generated class for the MessagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  messages : Message[]=[];
  errorMessage:string;

  constructor(public adminservice: AdminServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
  getMessages(): void {
    this.adminservice.getMessages().subscribe(
            data => this.messages = data,
        error =>  this.errorMessage = <any>error);
 }
 ngOnInit(): void {
      this.getMessages();
 }

  deletemessage(_id:string): void {
    let i = this.messages.map(item => item._id).indexOf(_id) // find index of your object
    this.messages.splice(i, 1) // remove it from array
//          let index = this.storeItems.indexOf[_id] 
// if(index!=-1){
//          this.storeItems.splice(index , 1);

       this.adminservice.deletemessage(_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
