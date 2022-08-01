import { Component, Input, OnInit } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../common/abstract-value-accessor';

@Component({
  selector: 'lib-mapfre-text-area',
  templateUrl: './mapfre-text-area.component.html',
  styleUrls: ['./mapfre-text-area.component.scss'],
  providers: [MakeProvider(MapfreTextAreaComponent)]
})
export class MapfreTextAreaComponent extends AbstractValueAccessor implements OnInit {

  @Input() title: string;
  @Input() placeholder: string = '';
  @Input() rows: string = '5';

  textAreaValue = '';
  constructor() {
    super();
  }

  ngOnInit() {}

  onInput(){
    this.onTouched();
    this.onChange(this.textAreaValue);
  }

}
