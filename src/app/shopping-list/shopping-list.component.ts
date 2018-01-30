import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../models/item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  public modalCreateList: string;
  public modalAddItem: string;
  public items: Item[];
  public list: string;
  public formSubmittedInvalid: boolean = false;
  public formSubmittedSuccess: boolean = false;
  public form: any;
  public formDatePicker: any;
  public nameFieldValue: string = '';
  public quantityFieldValue: number = 1;
  public commentsFieldValue: string = '';

  constructor(private modalService: ModalService, private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.modalAddItem = 'addItem';
    this.modalCreateList = 'createList';
    this.initForms();
    this.getItems();
    this.getList();
  }

  public openModal(id: string): void {
    this.modalService.open(id);
  }

  public getItems(): void {
    this.shoppingListService.getItems(data => this.items = data);
  }

  public addItem(item: Item): void{
    if(item.quantity === null)
      item.quantity = 1;
    if(this.form.valid){
      this.shoppingListService.addItem(item);
      this.form.reset();
      this.formSubmittedInvalid = false;
      this.formSubmittedSuccess = true;
    } else {
      this.formSubmittedInvalid = true;
    }
  }

  public removeItem(item: Item): void{
    this.shoppingListService.removeItem(item);
  }

  public editItem(item: Item): void{
    this.nameFieldValue = item.name;
    this.quantityFieldValue = item.quantity;
    this.commentsFieldValue = item.comments;
    this.shoppingListService.removeItem(item);
  }

  public getList(): void{
    this.shoppingListService.getList(data => this.list = data);
  }

  public createList(value: any): void {
    this.shoppingListService.createList(value.date);
    this.uncheckAllItem();
    this.getList();
    this.modalService.close(this.modalCreateList);
  }

  public checkItem(item: Item): void {
    this.shoppingListService.checkItem(item);
  }

  public uncheckAllItem(): void {
    this.shoppingListService.uncheckAllItem();
  }

  private initForms(): void {
    this.form = new FormGroup({
      name: new FormControl(Validators.required),
      quantity: new FormControl(),
      comments: new FormControl()
    });

    let today = new Date().toJSON().slice(0,10);

    this.formDatePicker = new FormGroup({
      date: new FormControl(today),
    });
  }
}
