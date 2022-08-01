import { Component, Input, OnInit } from '@angular/core';
import { topItem } from './mapfre-top-list.interface';


@Component({
  selector: 'lib-mapfre-top-list',
  templateUrl: './mapfre-top-list.component.html',
  styleUrls: ['./mapfre-top-list.component.scss'],
})


export class MapfreTopListComponent implements OnInit {

  @Input() items: topItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items.sort((a,b) => (a.percent < b.percent) ? 1 : ((b.percent < a.percent) ? -1 : 0))
    this.items.forEach((num) => this.setZerosItem(num));

    // this.items = items;
  }

  setZerosItem(obj: topItem): void{
    if (!isNaN(obj.percent)) {
      if (obj.percent.toString().includes('.')) {
        obj.percent = obj.percent.toString().concat('0').replace('.', ',');
      } else {
        obj.percent = obj.percent.toString().concat(',00');
      }
    }

    obj.title = obj.title;
    obj.head = obj.head;
  }

}
