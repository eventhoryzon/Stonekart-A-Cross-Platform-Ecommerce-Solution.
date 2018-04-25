import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
  //Home
// let apiUrl = 'http://139.153.62.240:3333/';

// let apiUrl = 'http://192.168.1.68:3333/';

let apiUrl = 'http://127.0.0.1:3333/';


@Injectable()
export class AuthServiceProvider {
   LOCAL_TOKEN_KEY;
   isLoggedin: boolean;
    AuthToken;
  
    static get parameters(){
    return [Http];  
  }

  constructor(public http: Http,isLoggedin,AuthToken,LOCAL_TOKEN_KEY) {
    this.http = http;
    this.LOCAL_TOKEN_KEY = "Seller Token";
    this.isLoggedin = false;
    this.AuthToken = null;
  }

  storeUserCredentials(token){
    window.localStorage.setItem(this.LOCAL_TOKEN_KEY,token);
    this.useCredentials(token);
  }

  useCredentials(token){
    this.isLoggedin = true;
    this.AuthToken = token;
  }

  loadUserCredentials(){
    var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    this.useCredentials(token);
  }

  destroyUserCredentials(){
    this.isLoggedin = false;
    this.AuthToken = null;
    window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
  }
  login(credentials){
    
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'sellerloginAuthenticate', JSON.stringify(credentials) , {headers: headers})

          .subscribe(res => {
            if(res.json().success){
              this.storeUserCredentials(res.json().token);
              resolve(true);
            }else{
              resolve(false);
            }
          });
    });
          }

  signup(data) {
    return new Promise((resolve, reject) => {
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'addnewseller', JSON.stringify(data.value), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
  
   getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log(this.AuthToken);
            headers.append('Authorization', 'Bearer ' +this.AuthToken);
            this.http.get(apiUrl+'getsellerinfo', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }
   
  logout() {
        this.destroyUserCredentials();
    };
      
}

