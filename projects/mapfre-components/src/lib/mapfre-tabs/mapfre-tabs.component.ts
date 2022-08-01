import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-mapfre-tabs',
  templateUrl: './mapfre-tabs.component.html',
  styleUrls: ['./mapfre-tabs.component.scss'],
})
export class MapfreTabsComponent implements OnInit {
  @Input() dataTabs: any[];
  @Output() tabChange = new EventEmitter();
  public selectedTabIndex: number;
  constructor() { }

  ngOnInit(): void {
    this.selectedTabIndex = this.selectedTabIndex = this.dataTabs.findIndex(t => t.selected);
  }

  changeIndex(index: number){
    this.tabChange.emit({
      index,
      data:this.dataTabs[index]
    })
  }
}
