import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  public formList: any;

  constructor(private _modalService: ModalService, private _shoppingListService: ShoppingListService) { }

  public ngOnInit(): void {
    this.initForms();
  }

  public createList(value: string): void {
    this._shoppingListService.createList(value.date);
    this.uncheckAllItem();
    this._modalService.close('modalList');
  }

  public uncheckAllItem(): void {
    this._shoppingListService.uncheckAllItem();
  }

  private initForms(): void {
    let today = new Date().toJSON().slice(0,10);
    this.formList = new FormGroup({
      date: new FormControl(today, Validators.required)
    });
  }

}
