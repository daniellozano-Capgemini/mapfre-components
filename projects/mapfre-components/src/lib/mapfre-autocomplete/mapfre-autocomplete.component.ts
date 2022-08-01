import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MapfreAutoCompleteOptions } from './mapfre-autocomplete.interface';

@Component({
  selector: 'lib-mapfre-autocomplete',
  templateUrl: './mapfre-autocomplete.component.html',
  styleUrls: ['./mapfre-autocomplete.component.scss'],
})
export class MapfreAutocompleteComponent implements OnInit {

  @Input() options: MapfreAutoCompleteOptions;
  @Input() formGroup: FormGroup;
  @Input() observable$: Observable<any>;
  formControlName: string;
  maxlength: string;
  class: string;
  dataKey: string;
  required: boolean;

  constructor() {
    this.maxlength = '30'
  }

  ngOnInit() {
    this.formControlName = this.options?.formControlName;
    this.dataKey = this.options?.dataKey;
  }

  optionSelected(v){
    this.formGroup.get(this.formControlName).setValue(v)
  }

}
