import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  public formList: any;

  constructor(private _modalService: ModalService, private _shoppingListService: ShoppingListService, private _fb: FacebookService) {
    let initParams: InitParams = {
      appId: '190907408328021',
      xfbml: true,
      version: 'v2.12'
    };
    _fb.init(initParams);
  }

  public ngOnInit(): void {
    this.initForms();
  }

  public createList(value: any): void {
    this._shoppingListService.createList(value.date);
    this.uncheckAllItem();
    this._modalService.close('modalList');
    this.sendMessageByFacebook();
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

  private sendMessageByFacebook(): void {
    let params: UIParams = {
      link: 'http://arnaudmartin.me/projects/daily-manager/#/shopping-list',
      method: 'send',
      to: '1447762374'
    };
    this._fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

}
