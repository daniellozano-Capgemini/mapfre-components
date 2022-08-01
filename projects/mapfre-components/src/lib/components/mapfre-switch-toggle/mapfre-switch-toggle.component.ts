import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataSwitchToggle } from './mapfre-switch-toggle.interface';
@Component({
  selector: 'lib-mapfre-switch-toggle',
  templateUrl: './mapfre-switch-toggle.component.html',
  styleUrls: ['./mapfre-switch-toggle.component.scss'],
})
export class MapfreSwitchToggleComponent {
  @Input() dataSwitchToggle: DataSwitchToggle;
  @Input() formCtrl?: FormControl = new FormControl();
  @Input() border?: boolean = true;
  @Input() valign?: string;
  @Output() checked = new EventEmitter<boolean>();

  constructor() { }
  public onChange() {
    this.checked.emit(this.dataSwitchToggle.check);
  }
}
