import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { EmailValidator } from '../../../node_modules/ng-email-validation';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})




export class ContactPage {
  public messageform : FormGroup;
  loading : any;


  constructor(public http : Http,public navCtrl: NavController,public messageformbuilder : FormBuilder, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
 this.messageform = messageformbuilder.group({
      'username' :['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])],
      'email' : ['', Validators.compose([Validators.required, EmailValidator.emailValidator])],
      'message' :['', Validators.compose([Validators.required,Validators.minLength(15),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(30)])]
  });
}

  
doContact() {
  this.showLoader();
  this.sendmessage(this.messageform).then((result) => {
    this.loading.dismiss();
    this.presentToast('Message Saved');
    this.navCtrl.pop();
  }, (err) => {
    this.loading.dismiss();
    this.presentToast(err);
  });
}

sendmessage(data) {
  return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://127.0.0.1:3333/sendNewMessage', JSON.stringify(data.value), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
  });
}
showLoader(){
  this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
  });

  this.loading.present();
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 5000,
    position: 'bottom',
    dismissOnPageChange: true
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
