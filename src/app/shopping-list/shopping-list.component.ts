import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  public modalAddItem: string;

  form: any;

  items: any = [
    {
      id: 1,
      name: 'Concombre',
      quantity: 3
    },
    {
      id: 2,
      name: 'Tomates Cerises',
      quantity: 1
    },
    {
      id: 3,
      name: 'Pain',
      quantity: 1,
      specs: 'Saint Méthode'
    }
  ];

  constructor(private modalService: ModalService) { }

  public ngOnInit(): void {
    this.modalAddItem = 'addItem';
    this.initForm();
  }

  public openModal(id: string): void {
    this.modalService.open(id);
  }

  public addItem(values): void{
    console.log(values);
  }

  private initForm(): void {
    this.form = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemQuantity: new FormControl(''),
      itemSpecs: new FormControl('')
    });
  }

}
