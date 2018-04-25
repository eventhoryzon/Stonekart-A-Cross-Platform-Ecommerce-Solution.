import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Signup } from '../signup/signup';
import {AuthService} from '../../providers/auth-service/auth-service';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loading: any;
  loginData ={ email:'',password:'' };
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  doLogin() {
  
  // this.showLoader();
  // this.loading.present().then(() => {
  this.authService.login(this.loginData).then((result) => {
      // this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      // this.loading.dismiss();
      this.presentToast("Either your credentials are wrong or we are facing some server issues please bear with us<br><br> Thank You");
    });
  // });
  }

  register() {
    this.navCtrl.push(Signup);
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
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });
  }
}
