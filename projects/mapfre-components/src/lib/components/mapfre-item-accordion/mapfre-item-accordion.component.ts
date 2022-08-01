import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemAccordion, Link } from './mapfre-item-accordion.interface';

@Component({
  selector: 'mapfre-item-accordion',
  templateUrl: './mapfre-item-accordion.component.html',
  styleUrls: ['./mapfre-item-accordion.component.scss']
})
export class MapfreItemAccordionComponent implements OnInit {
  @Input() item: ItemAccordion;
  @Input() collapsable: boolean;
  @Output() linkClicked = new EventEmitter<string | number>();
  @Output() titleClicked = new EventEmitter<string>();
  @Output() buttonClicked = new EventEmitter<string>();
  @Output() iconClicked = new EventEmitter<boolean>();

  private readonly DEFAULT_ICON_RIGHT = 'simple-arrow-up';

  constructor() {}

  ngOnInit() {
    if (!this.item?.itemRight) this.item.itemRight = this.DEFAULT_ICON_RIGHT;
  }

  itemToggle(event: Event) {
    event.stopPropagation();
    this.item.collapse =
      this.item?.description || this.item?.subtitle || this.item?.innerHTML ? !this.item?.collapse : null;
    this.titleClicked.emit(this.item?.link || this.item?.title);
  }

  onClickLink(subtitle: Link) {
    this.linkClicked.emit(subtitle?.url || subtitle?.value || subtitle?.title);
  }

  onClickButton() {
    this.buttonClicked.emit(this.item?.title);
  }

  onClickIcon() {
    this.iconClicked.emit(true);
  }
}
