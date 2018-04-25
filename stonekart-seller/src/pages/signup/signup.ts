import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {  ProductManagementPage} from '../product-management/product-management';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder,FormGroup, Validators,FormControl } from '@angular/forms';
import { ValidatorProvider } from '../../providers/validator/validator';
import { EmailValidator } from '../../../node_modules/ng-email-validation';
// import { ControlGroup } from '@angular/forms'

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  loading: any;
  public userregform : FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public userregformbuilder : FormBuilder,public fb : FormBuilder, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.userregform = userregformbuilder.group({
      'firstname' :['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])],
      'lastname' : ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])],
      'email' : ['', Validators.compose([Validators.required, EmailValidator.emailValidator])],
      'mobilenumber' :['', Validators.compose([Validators.required,Validators.minLength(10)])],
      'password' : ['', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(15)])],
      'confirmpassword' : ['', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(15)])]
    },{validator: this.matchingPasswords('password','confirmpassword')});
  }


 
  
  
  doSignup() {
    this.showLoader();
    this.authService.signup(this.userregform).then((result) => {
      this.loading.dismiss();
      this.presentToast('User Credententials are Saved');
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
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
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  //Matching the passwords custom validator  
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
  }
}
}

