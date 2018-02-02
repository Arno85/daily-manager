import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  public form: any;
  public formSubmittedInvalid: boolean = false;
  public formSubmittedSuccess: boolean = false;
  public isNewItem: boolean;
  public titleForm: string;

  constructor(private shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl(1),
      comments: new FormControl('')
    });
  }

  
  public setForm(item?:Item): void {
    if(item !== undefined){
      this.form.setValue({name: item.name, quantity: item.quantity, comments: item.comments});
      this.titleForm = 'Edit';
      this.isNewItem = false;
    }
    else{
      this.form.reset({quantity: 1});
      this.titleForm = 'Add';
      this.isNewItem = true;
    }  
  }

  public addItem(item: Item): void{
    if(this.form.valid){
      this.shoppingListService.addItem(item);
      this.form.reset({quantity: 1});
      this.formSubmittedInvalid = false;
      this.formSubmittedSuccess = true;
    } else {
      this.formSubmittedInvalid = true;
    }
  }

  public editItem(item: Item): void {
    
  }
}
