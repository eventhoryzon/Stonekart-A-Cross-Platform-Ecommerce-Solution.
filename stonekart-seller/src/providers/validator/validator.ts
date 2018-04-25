import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';

/*
  Generated class for the ValidatorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ValidatorProvider {

  constructor(public http: Http) {
    console.log('Hello ValidatorProvider Provider');
  }

   validateEmail(control: FormControl)
   {
      return new Promise(resolve =>
      {
         let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         if(!emailPattern.test(control.value))
         {
            resolve({ InvalidEmail : true });
         }
         resolve(null);
      });
   }

}
