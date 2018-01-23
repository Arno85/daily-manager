import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
