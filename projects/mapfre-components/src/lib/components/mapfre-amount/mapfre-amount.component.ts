
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemAmount } from './mapfre-amount.interface';

@Component({
  selector: 'lib-mapfre-amount',
  templateUrl: './mapfre-amount.component.html',
  styleUrls: ['./mapfre-amount.component.scss'],
})
export class MapfreAmountComponent implements OnInit, OnChanges {

  @Input() amount: ItemAmount;
  @Input() size: 'small' | 'normal-s' | 'normal' | 'normal-x' | 'big'  = 'normal';
  @Input() readonly: boolean;
  amountNumber: string;
  amountDecimal: string;

  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.formatAmount();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.amount?.currency ? '' : this.amount.currency = 'EUR';
    if (changes.amount && changes.amount.currentValue) {
      this.formatAmount();
    }
  }

  formatAmount(){
    let number;
    switch (this.amount.format) {
      case 'currency':
        number = this.currencyPipe.transform(this.amount.value, this.amount?.currency,  'symbol-narrow', `1.${this.amount.decimals}-${this.amount.decimals}`);
        break;
      case 'decimal':
        number = this.decimalPipe.transform(this.amount.value, `1.${this.amount.decimals}-${this.amount.decimals}`);
        break;
      case 'stringToCurrency':
        const value = this.amount?.value?.toString()?.replace(/\./g, '')?.replace(',', '.')?.trim();
        number = this.currencyPipe.transform(value, this.amount?.currency,  'symbol-narrow', `1.${this.amount.decimals}-${this.amount.decimals}`);
        break;
      case 'stringToDecimal':
        this.amount.value = this.amount?.value?.toString()?.replace(/\./g, '')?.replace(',', '.')?.trim();
        number = this.decimalPipe.transform(this.amount.value, `1.${this.amount.decimals}-${this.amount.decimals}`);
        break;
      default:
        number = this.currencyPipe.transform(this.amount.value, this.amount?.currency,  'symbol-narrow', `1.${this.amount.decimals}-${this.amount.decimals}`);
        break
    }
    this.amountNumber = number ? number.split(',')[0] : 0;
    this.amountDecimal = number ? number.split(',')[1] : 0;
  }
}
