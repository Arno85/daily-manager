import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { Item } from '../models/item';
import { FormItemComponent } from './form-item/form-item.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public title: string = 'Shopping List';
  public modalItem: string;
  public modalList: string; 
  public items: Item[];
  public list: string;
  public errorMessage: string;

  private _itemsInitSubscription: Subscription;
  private _itemsChangesSubscription: Subscription;
  private _listInitSubscription: Subscription;
  private _listChangesSubscription: Subscription;

  @ViewChild(FormItemComponent) formItem;
  
  constructor(private _modalService: ModalService, private _shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.modalItem = 'modalItem';
    this.modalList = 'modalList';
    this.getItems();
    this.updateItemsOnChanges();
    this.getList();
    this.updateListOnChanges();
  }

  public openModal(id: string): void {
    this._modalService.open(id);
  }

  public getItems(): void {
    this._itemsInitSubscription = this._shoppingListService.getItems().subscribe(
      data => this.items = data, 
      error => this.errorMessage = <any>error
    );
  }

  public updateItemsOnChanges(): void {
    this._itemsChangesSubscription = this._shoppingListService.getItemsEmitter().subscribe(
      data => this.items = data, 
      error => this.errorMessage = <any>error
    );
  }

  public removeItem(item: Item): void{
    this._shoppingListService.removeItem(item);
  }

  public checkItem(item: Item): void {
    this._shoppingListService.checkItem(item);
  }

  public getList(): void{
    this._listInitSubscription = this._shoppingListService.getList().subscribe(
      data => this.list = data, 
      error => this.errorMessage = <any>error
    );
  }

  public updateListOnChanges(): void {
    this._listChangesSubscription = this._shoppingListService.getListEmitter().subscribe(
      data => this.list = data, 
      error => this.errorMessage = <any>error
    );
  }

  public ngOnDestroy(): void {
    this._itemsInitSubscription.unsubscribe();
    this._itemsChangesSubscription.unsubscribe();
    this._listInitSubscription.unsubscribe();
    this._listChangesSubscription.unsubscribe();
  }
}
