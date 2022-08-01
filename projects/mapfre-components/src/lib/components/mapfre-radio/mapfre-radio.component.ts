import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-mapfre-radio',
  templateUrl: './mapfre-radio.component.html',
  styleUrls: ['./mapfre-radio.component.scss'],
})
export class MapfreRadioComponent {

  @Input() title: string;
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() optionsRadio: any[];
  @Input() required: boolean = false;
  @Output() selectedRadio = new EventEmitter<any>();

  constructor() {}

  selectOption(option:any): void{
    this.optionsRadio.forEach(options =>{
     options.checked = options.id === option.id;
    })
    this.selectedRadio.emit(option);
  }

}
