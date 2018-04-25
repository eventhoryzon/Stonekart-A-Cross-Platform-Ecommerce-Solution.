// import { Injectable } from '@angular/core';
// import { Http,Headers,RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// // import {Image} from '../../pages/addproduct/images';
// import {Item} from '../cart-service/Item';
// /*
//   Generated class for the ImageserviceProvider provider.

//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular 2 DI.
// */

//     //Home
// let apiUrl = 'http://192.168.1.68:3333/';
// // // University
// // let imageUrl= 'http://139.153.62.52:3333/createproduct';
// // let apiUrl = 'http://127.0.0.1:3333/';

// @Injectable()
// export class ImageserviceProvider {

//   private imageUrl= 'http://192.168.1.68:3333/createproduct';

//     createOptions(name: string, pw: string) {
//         let headers = new Headers();
//         // headers.append('Content-Type', 'application/json');  // without this
//         // headers.append('Content-Type', 'multipart/form-data');  // without this
//         let options = new RequestOptions({ headers: headers });
//         return options;
//     }

//     constructor(private http: Http) { }

//     getImageById(id: number): Promise<Image> {
//         const url = `${this.imageUrl}`;
//         console.log(url);
//         let headers = new Headers();
//         let token = 'token';
//         headers.append('X-Auth-Token', token);
//         return this.http.get(url, {headers: headers})
//                         .toPromise()
//                         // .then(res => res.json().data as Image)
//                         .then(res => console.log(res))
//                         .catch(this.handleError);
//     }

//     getImageByUrl(url: string): Promise<Image> {
//         return this.http.get(url)
//                       .toPromise()
//                       .then(res => res.json() as Image)
//                       // .then(res => console.log(res))
//                       .catch(this.handleError);
//     }

//     post(formData: FormData,): Promise<Image> {
//         // let options = this.createOptions(user, pw);
//         console.log('we will have a post!');
//         console.log(formData.get('imagepath'));
//         console.log(formData.get('fileUrl'));
//         console.log(formData.get('des'));
//         return this.http.post(this.imageUrl, formData)
//                         .toPromise()
//                         .then(res => res.json() as Image)
//                         .catch(this.handleError);
//     }

//     private handleError(error: any): Promise<any> {
//         console.error('An error occurred', error); // for demo purposes only
//         return Promise.reject(error.message || error);
//     }
// }