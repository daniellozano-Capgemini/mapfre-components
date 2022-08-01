import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DataSelectMenu {
  title: string;
  key: string
}

@Component({
  selector: 'lib-mapfre-select-menu',
  templateUrl: './mapfre-select-menu.component.html',
  styleUrls: ['./mapfre-select-menu.component.scss'],
})
export class MapfreSelectMenuComponent {
  @Input() dataSelectMenu: DataSelectMenu[];
  @Output() menuSelected = new EventEmitter<DataSelectMenu>();
  constructor() { }
  public onChange(selMenu: DataSelectMenu){
    this.menuSelected.emit(selMenu);
  }
}
