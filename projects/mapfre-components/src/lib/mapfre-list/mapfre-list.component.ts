import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataList } from './mapfre-list.interface';

@Component({
  selector: 'lib-mapfre-list',
  templateUrl: './mapfre-list.component.html',
  styleUrls: ['./mapfre-list.component.scss'],
})
export class MapfreListComponent {
  @Input() dataList: DataList[];
  @Input() color?: boolean;
  @Input() listType?: boolean = false;
  @Input() border?: boolean;
  @Input() cssClass?: string;

  @Output() listButtonClicked = new EventEmitter();
  @Output() onIconRightClick = new EventEmitter();

  constructor() {
  }

  isNumber(value: string | number): boolean {
    return typeof value === 'number';
  }

  isProfitOrLoss(element: DataList): string {
    if (element?.title === "Pérdidas y ganancias") {
      return element?.amount?.value >= 0 ? 'profit' : 'loss';
    }
    if (element?.amount?.color !== undefined) {
      return element.amount.color ? 'profit' : 'loss';
    }
    if (element?.key) {
      return element?.amount?.value >= 0 ? 'profit' : 'loss';
    }
  }

  isPositive(element: DataList): string {
    if (element.value.toString().includes('+')){
      return 'profit';
    }
    if (element.value.toString().includes('-')) {
      return 'loss'
    }
  }

  onClickButton() {
    this.listButtonClicked.emit()
  }

  formatSecretValue(data:string | number | string[]): string {
    if ( typeof data === 'object') return;
    const dataString: string = typeof data === 'number' ? data.toString() : data;
    return dataString.replace(/[a-zA-Z0-9]/g, '*');
  }

  validateTypeValue(value, id): boolean {
    if (typeof value === 'string' || typeof value === 'number') {
      return true;
    } else {
      this.dataList[id].values = value;
      return false;
    }
  }

  emitListInfoHandler(event){
    this.onIconRightClick.emit(event);
  }
}
