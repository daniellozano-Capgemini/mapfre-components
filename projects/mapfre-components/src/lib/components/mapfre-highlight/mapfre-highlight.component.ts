import { ItemHighlight } from './mapfre-highlight.interface';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ItemAmount } from '../mapfre-amount/mapfre-amount.interface';

@Component({
  selector: 'lib-mapfre-highlight',
  templateUrl: './mapfre-highlight.component.html',
  styleUrls: ['./mapfre-highlight.component.scss'],
})
export class MapfreHighlightComponent implements OnInit {

  @Input() item: ItemHighlight;
  @Input() noShadow: boolean = false;
  @Input() hasBorder: boolean = false;
  @Output() emitInfo: EventEmitter<any> = new EventEmitter<any>()
  @Output() onIconRightClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  emitInfoHandler(event){
    this.emitInfo.emit(event);
  }

  emitListInfoHandler(event){
    this.onIconRightClick.emit(event);
  }
}
