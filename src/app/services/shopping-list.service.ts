import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable()
export class ShoppingListService {

  private _items: Item[] = [];
  private _list: string;

  constructor() { }

  public getItems(): Item[] {
    return this._items = JSON.parse(localStorage.getItem('items'));
  }

  public addItem(item: Item): void {
    item.status = false;
    this._items.push(item);
    this.saveItems();
  }

  public removeItem(item: Item): number{
    let removeIndex = this._items.indexOf(item);
    this._items.splice(removeIndex, 1);
    this.saveItems();
    return removeIndex;
  }

  public checkItem(item: Item): void {
    let retrivedItem = this._items.find(obj => obj === item);
    retrivedItem.status = !retrivedItem.status;
    this.saveItems();
  }

  public uncheckAllItem(): void {
    this._items.forEach(obj => obj.status = false);
    this.saveItems();
  }

  private saveItems(): void{
    localStorage.setItem('items', JSON.stringify(this._items));
  }

  public createList(date: string): void {
    this._list = date;
    this.saveList();
  }

  public getList(): string {
    return this._list = JSON.parse(localStorage.getItem('list'));
  }

  private saveList(): void {
    localStorage.setItem('list', JSON.stringify(this._list));
  }
}
