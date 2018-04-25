import { Injectable } from '@angular/core';
import { Http, Response,Headers,Request,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Order } from './order';

// let apiUrl = 'http://192.168.1.68:3333/';
// // University
// let apiUrl = 'http://139.153.62.240:3333/';

let apiUrl = 'http://127.0.0.1:3333/';
@Injectable()
export class OrderService{

  observableOrders: Observable<Order[]>;
	allOrders: Order[] = [];
    selectedOrders: Order[] = [];
    errorMessage: any;
    headers:Headers;
	url = apiUrl+"getallorders";
	constructor(private http:Http) { 
	   this.observableOrders = this.http.get(this.url).map((res: Response) => res.json());
	   this.observableOrders.subscribe(
	             data => this.allOrders = data,
				 error =>  this.errorMessage = <any>error);
	}
	getOrders(): Observable<Order[]> {
	   return this.observableOrders;
	}
	getSelectedOrders(): Order[] {
	   return this.selectedOrders;
	}	
    addOrder(_id:string): void {
       let order = this.allOrders.find(ob => ob._id === _id);
       
       console.log('order'+order);
       console.log(_id);
       if (this.selectedOrders.indexOf(order) < 0) {	   
          this.selectedOrders.push(order);
	   }
    }
 
    removeOrder(_id:string): void {
	   let item = this.selectedOrders.find(ob => ob._id === _id);
	   let itemIndex = this.selectedOrders.indexOf(item);
       this.selectedOrders.splice(itemIndex, 1);
    }
}