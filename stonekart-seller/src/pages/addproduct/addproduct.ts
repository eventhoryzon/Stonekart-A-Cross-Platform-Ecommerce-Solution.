import { Component , NgModule, OnInit ,Input,AfterViewInit,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators,FormControl,NgModel,DefaultValueAccessor,NgControl} from '@angular/forms';
import { ValidatorProvider } from '../../providers/validator/validator';
import { EmailValidator } from '../../../node_modules/ng-email-validation';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { FileDropDirective,FileSelectDirective,FileUploadModule,FileUploader} from 'ng2-file-upload';
import {Category} from '../addproduct/category';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/do';
import "rxjs/add/operator/map";

const URL = 'http://127.0.0.1:3333/';
// const URL = 'http://192.168.1.68:333/';
// const URL = 'http://139.153.62.240:3333/';
/**
 * Generated class for the AddproductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})

export class AddproductPage implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'imagepath'});
  loading: any;
   categories : Category[] = [];
   errorMessage: string;
  public addinventory : FormGroup;

  constructor(private http: Http, private el: ElementRef,public filetransfer : FileTransfer,public camera : Camera,public imagePicker : ImagePicker,public navCtrl: NavController, public navParams: NavParams,public addinventoryformbuilder : FormBuilder,public fb : FormBuilder, public adminService: AdminServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  this.addinventory = addinventoryformbuilder.group({
      'title' :['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])],
      'price' :  ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(4)])],
      'stock' :  ['', Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(2)])],
      'description' : ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(15)])], 
  });
    var picked_image ;
  }


  ngOnInit() {
    this.getCategories();
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
    }


    getCategories(): void {
      this.adminService.getCataloglist().subscribe(
              data => this.categories = data,
          error =>  this.errorMessage = <any>error);
   }
    
    addProduct() {
      //locate the file element meant for the file upload.
          let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#imagepath');
      //get the total amount of files attached to the file input.
          let fileCount: number = inputEl.files.length;
      //create a new fromdata instance
          let formData = new FormData();
      //check if the filecount is greater than zero, to be sure a file was selected.
          if (fileCount > 0) { // a file was selected
              //append the key name 'imagepath' with the first file in the element
                  formData.append('imagepath', inputEl.files.item(0));
                  formData.append('title',this.addinventory.value.title);
                  formData.append('price',this.addinventory.value.price);
                  formData.append('stock',this.addinventory.value.stock);
                  formData.append('description',this.addinventory.value.description);
              //call the angular http method
              this.http
          //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                  .post(URL+'createproduct', formData).map((res:Response) => res.json()).subscribe(
                  //map the success function and alert the response
                   (success) => {
                           alert(success._body);
                  },
                  (error) => alert(error))
            }
         }

    

   showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Adding Product'
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
}