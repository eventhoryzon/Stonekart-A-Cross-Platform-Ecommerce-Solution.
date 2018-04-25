import { Injectable } from '@angular/core';
import { Headers ,RequestOptionsArgs,RequestOptions,Request,Response} from '@angular/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { File } from '@ionic-native/File';
import { Observable } from 'rxjs';
import { User } from './User';
import { Category }  from '../../pages/addproduct/category';
import { Seller } from './Seller';
import { Message } from './Message';
    //Home
// let apiUrl = 'http://192.168.1.68:3333/';
// // University
// let apiUrl = 'http://139.153.62.240:3333/';
let apiUrl = 'http://127.0.0.1:3333/';


@Injectable()
export class AdminServiceProvider {

  observableUsers: Observable<User[]>;
  observableSellers: Observable<Seller[]>;
  observableCategories:Observable<Category[]>;
  observableMessages:Observable<Message[]>;
    allUsers: User[] = [];
    allSellers: Seller[]=[];
    allcategories:Category[]=[];
    allMessages:Message[]=[];
    errorMessage: any;
    headers:Headers;
  url = apiUrl+"getallusers";
  
	constructor(private http:Http) { 
	   this.observableUsers = this.http.get(this.url).map((res: Response) => res.json());
	   this.observableUsers.subscribe(
	             data => this.allUsers = data,
                 error =>  this.errorMessage = <any>error);
       this.observableCategories = this.http.get(apiUrl+'getcataloglist').map((res: Response) => res.json());
       this.observableCategories.subscribe(
                 data => this.allcategories = data,
                 error =>  this.errorMessage = <any>error);
       this.observableSellers = this.http.get(apiUrl+'getallsellers').map((res: Response) => res.json());
       this.observableSellers.subscribe(
                 data => this.allSellers = data,
                 error =>  this.errorMessage = <any>error);
       this.observableMessages = this.http.get(apiUrl+'getallmessages').map((res: Response) => res.json());
       this.observableMessages.subscribe(
                 data => this.allMessages = data,
                 error =>  this.errorMessage = <any>error);
                                     
	}
	getUsers(): Observable<User[]> {
	   return this.observableUsers;
  }
   getCataloglist():Observable<Category[]>{
       return this.observableCategories;

   }
getSellers(): Observable<Seller[]>{
    return this.observableSellers;
}
getMessages():Observable<Message[]>{
    return this.observableMessages;
}


removesellerfromlist(_id:string){
    
     
     let delsellerurl=apiUrl+"deleteseller/"+_id

 
         return this.http.delete(delsellerurl).subscribe((res) => {
         });
 }



    removeuserfromlist(_id:string){
       
        
        let deluserurl=apiUrl+"deleteuser/"+_id

    
            return this.http.delete(deluserurl).subscribe((res) => {
            });
    }

    deletemessage(_id:string){
        
         
         let delmessageurl=apiUrl+"deletemessage/"+_id
 
     
             return this.http.delete(delmessageurl).subscribe((res) => {
                 
             });
     }
}