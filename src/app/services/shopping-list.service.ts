import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ShoppingListService implements OnDestroy{

  private _items: Item[] = [];
  private _list: string;
  private _url = environment.urlData;
  private _itemsChanges: EventEmitter<Item[]> = new EventEmitter();
  private _listChanges: EventEmitter<string> = new EventEmitter();
  private _saveItemsSubscription: Subscription;
  private _saveListSubscription: Subscription;

  constructor(private _http: HttpClient) { }

  //#region Items methods 
  public getItems(): Observable<Item[]>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams()
      .set('f', 'loadItems');

    return this._http.get<Item[]>(this._url, { params: params })
      .do(data => this._items = data)
      .catch(this.handleError);
  }

  public addItem(item: Item): void {
    let lastItem = this._items.slice(-1)[0];
    item.id = 1;
    if(lastItem !== undefined)
      item.id = lastItem.id + 1;
    item.status = false;
    this._items.push(item);
    this._saveItemsSubscription = this.saveItems().subscribe();
    this.emitItemsListEvent(this._items);
  }

  public removeItem(item: Item): void{
    let removeIndex = this._items.indexOf(item);
    this._items.splice(removeIndex, 1);
    this._saveItemsSubscription = this.saveItems().subscribe();
    this.emitItemsListEvent(this._items);
  }

  public editItem(item: Item): void{
    let retrievedItem = this._items.find(obj => obj.id === item.id)
    let indexToUpdate = this._items.indexOf(retrievedItem);
    this._items.splice(indexToUpdate, 1, item);
    this._saveItemsSubscription = this.saveItems().subscribe();
    this.emitItemsListEvent(this._items);
  }

  public checkItem(item: Item): void {
    let retrievedItem = this._items.find(obj => obj === item);
    retrievedItem.status = !retrievedItem.status;
    this._saveItemsSubscription = this.saveItems().subscribe();
  }

  public uncheckAllItem(): void {
    this._items.forEach(obj => obj.status = false);
    this._saveItemsSubscription = this.saveItems().subscribe();
  }

  private saveItems(): Observable<boolean>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams();

    params = params.append('f', 'saveItems');
    params = params.append('json', JSON.stringify(this._items));

    return this._http.get<boolean>(this._url, { params: params })
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }
  //#endregion

  //#region List methods 
  public getList(): Observable<string>{
    //localStorage.setItem('items', JSON.stringify(this._items));
    let params = new HttpParams()
      .set('f', 'loadList');

    return this._http.get<string>(this._url, { params: params })
      .do(data => data)
      .catch(this.handleError);
  }

  public createList(date: string): void {
    this._list = date;
    this.__saveListSubscription = this.saveList().subscribe()
    this.emitListEvent(date);
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
  //#endregion

  //#region Error method
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
  //#endregion

  //#region Events method
  private emitItemsListEvent(itemList: Item[]) {
    this._itemsChanges.emit(itemList);
  }

  public getItemsEmitter() {
    return this._itemsChanges;
  }

  private emitListEvent(list: string) {
    this._listChanges.emit(list);
  }

  public getListEmitter() {
    return this._listChanges;
  }
  //#endregion
  
  //#region OnDestroy method
  public ngOnDestroy(): void {
    this._saveItemsSubscription.unsubscribe();
    this._saveListSubscription.unsubscribe();
  }
  //#endregion
}
