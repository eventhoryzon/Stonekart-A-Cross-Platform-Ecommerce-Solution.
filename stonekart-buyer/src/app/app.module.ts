import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//pages
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { CartPage } from '../pages/cart/cart';
import { CardPage } from '../pages/card/card';
import { OrderPage } from '../pages/order/order'
import { AddressPage } from '../pages/address/address';
//providers
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { ProdService } from '../providers/prod-service/prod-service';
import { ItemService } from '../providers/cart-service/cart-service';
import { ValidatorProvider } from '../providers/validator/validator';
import { EmailValidator } from 'ng-email-validation';
import { Stripe } from '@ionic-native/stripe';
import { OrderService } from '../providers/order-service/order-service';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Signup,
    AboutPage,
    ContactPage,
    HomePage,
    UserPage,
    TabsPage,
    CartPage,
    CardPage,
    OrderPage,
    AddressPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Signup,
    AboutPage,
    ContactPage,
    UserPage,
    HomePage,
    TabsPage,
    CartPage,
    CardPage,
    OrderPage,
    AddressPage
  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    EmailValidator,
    Stripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ProdService,
    ItemService,
    HomePage,
    ValidatorProvider,
    FileTransfer,
    Camera,
    FilePath,
    ImagePicker,
    OrderService,
  ]
})
export class AppModule {}
