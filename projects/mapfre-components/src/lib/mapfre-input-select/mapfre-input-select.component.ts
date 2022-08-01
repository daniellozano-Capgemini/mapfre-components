import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'lib-mapfre-input-select',
  templateUrl: './mapfre-input-select.component.html',
  styleUrls: ['./mapfre-input-select.component.scss']
})
export class MapfreInputSelectComponent implements OnInit {
  // Will control if user wants to manipulate the select open options.
  // case undefined will the select will open when clicked and closed after choose an option or click outside.
  // case true, the select will always be opened.
  // case false, the select will always be closed.
  @Input() open: boolean = undefined;

  @Input() formCtrl: FormControl;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() searchable: boolean = false;
  @Input() delayedMilliseconds = 0;
  @Input() clearable: boolean = false;
  @Input() nombre: string = 'name';
  @Input() key: string = 'id';
  @Input() dropdownPosition: 'bottom' | 'top' | 'auto' = 'auto';

  @Input() set value(value: string | number) {
    this.valueSelected = value
  }

  // Select options.
  @Input() options = [];

  // Output events.
  @Output() openSelect = new EventEmitter();
  @Output() change = new EventEmitter();

  valueSelected = null;

  constructor(private config: NgSelectConfig) {
    // Not found text.
    this.config.notFoundText = 'No hay resultados';
  }

  ngOnInit(): void {
    if (this.open === true && this.delayedMilliseconds > 0) {
        this.open = false;
        setTimeout(() => this.open = true, this.delayedMilliseconds);
    }

    this.setSelected();
  }

  onClicked = () => {
    this.openSelect.emit()
  }

  onChange(opt): void {
    this.change.emit(opt);
  }

  reset(){
    this.value = null;
  }

  private setSelected() {
    this.options.some(option => {
      if (option.selected) {
        this.valueSelected = option.id;
      }
    });
  }
}
