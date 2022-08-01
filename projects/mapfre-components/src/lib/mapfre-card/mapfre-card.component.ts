import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mapfre-card',
  templateUrl: './mapfre-card.component.html',
  styleUrls: ['./mapfre-card.component.scss'],
})
export class MapfreCardComponent implements OnInit {

  @Input() highLight: boolean;
  @HostBinding("class.has-border") @Input() hasBorder: boolean = true;
  @Input() extraClass = '';

  constructor() { }

  ngOnInit() {}

}
