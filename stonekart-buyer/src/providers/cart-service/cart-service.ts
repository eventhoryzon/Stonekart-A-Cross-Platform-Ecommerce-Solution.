import { Injectable } from '@angular/core';
import { Http, Response,Headers,Request,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Item } from './item';
import { Order } from '../order-service/order';


// let apiUrl = 'http://192.168.1.68:3333/';
// // University
// let apiUrl = 'http://139.153.62.240:3333/';

let apiUrl = 'http://127.0.0.1:3333/';

@Injectable()
export class ItemService {
    observableItems: Observable<Item[]>;
    allItems: Item[] = [];
    observableOrders: Observable<Order[]>;
	allOrders: Order[] = [];
    selectedItems: Item[] = [];
    errorMessage: any;
    headers:Headers;
    url = apiUrl+"products";
    orderURL = apiUrl+"getallorders"
	constructor(private http:Http) { 
	   this.observableItems = this.http.get(this.url).map((res: Response) => res.json());
	   this.observableItems.subscribe(
	             data => this.allItems = data,
                 error =>  this.errorMessage = <any>error);
                 this.observableOrders = this.http.get(this.orderURL).map((res: Response) => res.json());
                 this.observableOrders.subscribe(
                           data => this.allOrders = data,
                           error =>  this.errorMessage = <any>error);
              
	}
	getItems(): Observable<Item[]> {
	   return this.observableItems;
    }
    
    getOrders(): Observable<Order[]> {
        return this.observableOrders;
     }
	getSelectedItems(): Item[] {
	   return this.selectedItems;
	}	
    addItem(_id:string): void {
       let item = this.allItems.find(ob => ob._id === _id);
       
       console.log('item'+item);
       console.log(_id);
       if (this.selectedItems.indexOf(item) < 0) {	   
          this.selectedItems.push(item);
	   }
    }
 
    removeItem(_id:string): void {
	   let item = this.selectedItems.find(ob => ob._id === _id);
	   let itemIndex = this.selectedItems.indexOf(item);
       this.selectedItems.splice(itemIndex, 1);
    }
    // removeOrder(_id:string): void {
    //     let item = this.selectedItems.find(ob => ob._id === _id);
    //     let itemIndex = this.selectedItems.indexOf(item);
    //     this.selectedItems.splice(itemIndex, 1);
    //  }

    filterItems(searchTerm){
        
               return this.allItems.filter((item) => {
                   return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
               });  
}
}