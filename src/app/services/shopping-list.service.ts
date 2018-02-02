import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';

@Injectable()
export class ShoppingListService {

  private _items: Item[] = [];
  private _list: string;
  private _url = environment.urlData;

  constructor(private _http: HttpClient) { }

  //#region public methods Items
  public getItems(callback): any{
    //return this._items = JSON.parse(localStorage.getItem('items'));
    this.loadItems().subscribe(data => {
      this._items = JSON.parse(data);
      return callback(this._items);
    })
  }

  public addItem(item: Item): void {
    let lastItem = this._items.slice(-1)[0];
    item.id = 1;
    if(lastItem !== undefined)
      item.id = lastItem.id + 1;
    item.status = false;
    this._items.push(item);
    this.saveItems().subscribe();
  }

  public removeItem(item: Item): void{
    let removeIndex = this._items.indexOf(item);
    this._items.splice(removeIndex, 1);
    this.saveItems().subscribe();
  }

  public editItem(item: Item): void{
    let retrievedItem = this._items.find(obj => obj.id === item.id)
    let indexToUpdate = this._items.indexOf(retrievedItem);
    this._items.splice(indexToUpdate, 1, item);
    this.saveItems().subscribe();
  }

  public checkItem(item: Item): void {
    let retrievedItem = this._items.find(obj => obj === item);
    retrievedItem.status = !retrievedItem.status;
    this.saveItems().subscribe();
  }

  public uncheckAllItem(): void {
    this._items.forEach(obj => obj.status = false);
    this.saveItems().subscribe();
  }
  //#endregion

  //#region public methods List
  public createList(date: string): void {
    this._list = date;
    this.saveList().subscribe();
  }

  public getList(callback): any {
    //return this._list = JSON.parse(localStorage.getItem('list'));
    this.loadList().subscribe(data => {
      this._list = JSON.parse(data)
      return callback(this._list);
    })
  }
  //#endregion

  //#region private methods
  private saveItems(): Observable<boolean>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams();

    params = params.append('f', 'saveItems');
    params = params.append('json', JSON.stringify(this._items));

    return this._http.get<boolean>(this._url, { params: params })
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }

  private loadItems(): Observable<string>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams()
      .set('f', 'loadItems');

    return this._http.get<string>(this._url, { params: params })
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }

  private saveList(): Observable<boolean> {
    //localStorage.setItem('list', JSON.stringify(this._list));
    let params = new HttpParams();

    params = params.append('f', 'saveList');
    params = params.append('json', JSON.stringify(this._list));

    return this._http.get<boolean>(this._url, { params: params })
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }

  private loadList(): Observable<string>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams()
      .set('f', 'loadList');

    return this._http.get<string>(this._url, { params: params })
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
  //#endregion
}
