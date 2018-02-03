import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { ShoppingListService } from '../../services/shopping-list.service';
import { ModalService } from '../../services/modal.service';
import { ShoppingListComponent } from '../shopping-list.component';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  public formItem: any;
  public formSubmittedInvalid: boolean = false;
  public formSubmittedSuccess: boolean = false;
  public isNewItem: boolean;
  public titleForm: string;

  constructor(private modalService: ModalService, private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.initForms();
  }
  
  public setForm(item?:Item): void {
    if(item !== undefined){
      this.formItem.setValue({id: item.id, name: item.name, quantity: item.quantity, comments: item.comments});
      this.titleForm = 'Edit';
      this.isNewItem = false;
    }
    else{
      this.formItem.reset({quantity: 1});
      this.titleForm = 'Add';
      this.isNewItem = true;
    }  
  }

  public addItem(item: Item): void{
    if(this.formItem.valid){
      this.shoppingListService.addItem(item);
      this.formItem.reset({quantity: 1});
      this.formSubmittedInvalid = false;
      this.formSubmittedSuccess = true;
    } else {
      this.formSubmittedInvalid = true;
    }
  }

  public editItem(item: Item): void {
    if(this.formItem.valid){
      this.shoppingListService.editItem(item);
      this.formSubmittedInvalid = false;
      this.modalService.close('modalItem');
    } else {
      this.formSubmittedInvalid = true;
    }
  }

  private initForms(): void {
    this.formItem = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1),
      comments: new FormControl('')
    });
  }
}
