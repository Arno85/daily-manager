import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { Item } from '../models/item';
import { FormItemComponent } from './form-item/form-item.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  public modalItem: string;
  public modalList: string; 
  public items: Item[];
  public list: string;
  @ViewChild(FormItemComponent) formItem;
  
  constructor(private modalService: ModalService, private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.modalItem = 'addItem';
    this.modalList = 'createList';
    this.getItems();
    this.getList();
  }

  public openModal(id: string): void {
    this.modalService.open(id);
  }

  public getItems(): void {
    this.shoppingListService.getItems(data => this.items = data);
  }

  public removeItem(item: Item): void{
    this.shoppingListService.removeItem(item);
  }

  public getList(): void{
    this.shoppingListService.getList(data => this.list = data);
  }

  public createList(value: any): void {
    this.shoppingListService.createList(value.date);
    this.uncheckAllItem();
    this.getList();
    this.modalService.close(this.modalList);
  }

  public checkItem(item: Item): void {
    this.shoppingListService.checkItem(item);
  }

  public uncheckAllItem(): void {
    this.shoppingListService.uncheckAllItem();
  }
}
