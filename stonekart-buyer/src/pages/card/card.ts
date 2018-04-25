	
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Stripe } from '@ionic-native/stripe';

/**
 * Generated class for the CardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
}
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe, public http: Http) {
  }
 
  pay() {
    this.stripe.setPublishableKey('pk_test_kmqh2J0kSyAV0msq3M6Ct2iH');
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      var data = 'stripeToken=' + token + '&amount=50';
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post('http://127.0.0.1:3333/processpay', data, { headers: headers }).subscribe((res) => {
        if (res.json()==true)
        alert('transaction Successfull!!')  
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

}

