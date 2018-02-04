import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tip-calculator',
  templateUrl: './tip-calculator.component.html',
  styleUrls: ['./tip-calculator.component.scss']
})
export class TipCalculatorComponent implements OnInit {

  public formTip: any;
  public bill: any = {};
  public gstRate: number = 5;
  public qstRate: number = 9.975;

  constructor() { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formTip = new FormGroup({
      amount: new FormControl(null, Validators.required),
      tipRate: new FormControl(null)
    });
  }

  public calcTip(value): any {
    if(value.tipRate === null){
      value.tipRate = 15;
    }
    this.bill.amount = value.amount;
    this.bill.gstAmount = (value.amount * (this.gstRate / 100)).toFixed(2);
    this.bill.qstAmount = (value.amount * (this.qstRate / 100)).toFixed(2);
    this.bill.totalBill = (value.amount + (value.amount * (this.gstRate / 100) + value.amount * (this.qstRate / 100))).toFixed(2);
    this.bill.tipRate = value.tipRate;
    this.bill.tipAmount = (value.amount * (value.tipRate / 100)).toFixed(2);
  }
}
