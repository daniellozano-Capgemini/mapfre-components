import { Component, Input } from '@angular/core';

interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

@Component({
  selector: 'lib-mapfre-tab-menu',
  templateUrl: './mapfre-tab-menu.component.html',
  styleUrls: ['./mapfre-tab-menu.component.scss'],
})
export class MapfreTabMenuComponent {
  @Input() menu: MenuItem[];
}
