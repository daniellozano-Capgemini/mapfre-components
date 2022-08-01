import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-mapfre-buttton-toggle',
  templateUrl: './mapfre-button-toggle.component.html',
  styleUrls: ['./mapfre-button-toggle.component.scss'],
})
export class MapfreButtonToggleComponent {
  @Input() dataButtonToggle: any[]; // todo type
  @Input() iconSize: 'xs' | 's' | 'sm' | 'm' | 'l' | 'xl' = 'm';
  @Output() buttonToggleSelected = new EventEmitter<any>();
 
  constructor() { }

  public onChange(buttonSel){
    this.dataButtonToggle.forEach( button => {
      button.selected = buttonSel.title === button.title;
    });
    this.buttonToggleSelected.emit(buttonSel);
  }
}
