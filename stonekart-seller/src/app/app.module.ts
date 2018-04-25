import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//pages

import { ProductManagementPage } from '../pages/product-management/product-management';
import { ProdadminPage} from '../pages/prodadmin/prodadmin';
import {AddproductPage} from '../pages/addproduct/addproduct';
import { UseradminPage} from '../pages/useradmin/useradmin';
import {Login} from '../pages/login/login';
import {Signup} from '../pages/signup/signup';
import { ManagesellerPage} from '../pages/manageseller/manageseller';
import { MessagesPage} from '../pages/messages/messages';
//providers
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProdService } from '../providers/prod-service/prod-service';
import { ItemService } from '../providers/cart-service/cart-service';
import { ValidatorProvider } from '../providers/validator/validator';
import { EmailValidator } from 'ng-email-validation';
import { AdminServiceProvider } from '../providers/admin-service/admin-service';
// import { ImageserviceProvider } from '../providers/imageservice/imageservice';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    AddproductPage,
    ProdadminPage,
    UseradminPage,
    ProductManagementPage,
    Login,
    Signup,
    ManagesellerPage,
    MessagesPage


    // SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddproductPage,
    UseradminPage,
    ProdadminPage,
    ProductManagementPage,
    Login,
    Signup,
    ManagesellerPage,
    MessagesPage
    // SearchPage
  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    EmailValidator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdService,
    ItemService,
    ValidatorProvider,
    FileTransfer,
    Camera,
    FilePath,
    ImagePicker,
    AdminServiceProvider,
    // ImageserviceProvider,
    AuthServiceProvider,
  ]
})
export class AppModule {}
