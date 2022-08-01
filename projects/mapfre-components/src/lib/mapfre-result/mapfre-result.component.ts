import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'lib-mapfre-result',
  templateUrl: './mapfre-result.component.html',
  styleUrls: ['./mapfre-result.component.scss']
})
export class MapfreResultComponent implements OnInit {
  @Input() data: any;
  
  constructor(private nav: NavController) {}

  ngOnInit() {}

  goTo(link, state = {}, fn: Function) {
    if (fn && typeof fn === 'function') {
      fn();
      return;
    }

    if (link) {
      this.nav.navigateForward([link], { state: { ...state } });
    }
  }
}
