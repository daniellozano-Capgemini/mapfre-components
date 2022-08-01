import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'lib-mapfre-checkbox',
  templateUrl: './mapfre-checkbox.component.html',
  styleUrls: ['./mapfre-checkbox.component.scss'],
})
export class MapfreCheckboxComponent implements OnInit {

  constructor() { }
  @Input() formContrl: FormControl;
  @Input() checked: boolean = false;
  @Input() required: boolean = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() disabled: boolean = false;
  @Input() disabledText: string;
  @Input() text: string | number;
  @Input() links: {value: string, url?: string}[];
  @Input() linksSecond: {value: string, url?: string}[];
  @Input() moreText: string;
  @Output() linkEvent = new EventEmitter();

  ngOnInit() {}

  emitClick(event, link){
    event.preventDefault();
    this.linkEvent.emit(link.url ? link?.url : link.value);
  }
}
