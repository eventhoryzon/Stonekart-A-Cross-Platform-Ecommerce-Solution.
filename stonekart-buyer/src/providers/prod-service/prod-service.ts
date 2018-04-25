import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
  //Home
// let apiUrl = 'http://192.168.1.68:3333/';
// // University
// let apiUrl = 'http://139.153.62.240:3333/';
let apiUrl = 'http://127.0.0.1:3333/';


@Injectable()
export class ProdService {
  public file: File;
public url: string;
headers: Headers;
  
    static get parameters(){
    return [Http];  
  }



constructor(public http: Http) {
  
}

getSingleProduct(){
  return this.http.get(apiUrl+'product/:id')
  .map(res => res.json());
}

getAllProducts() {
return this.http.get(apiUrl+'products')
  .map(res => res.json());
}

getcategories() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.http.get(apiUrl+'getcataloglist', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }
}

