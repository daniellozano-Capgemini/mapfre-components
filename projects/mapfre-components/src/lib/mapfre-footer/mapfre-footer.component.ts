import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-mapfre-footer',
  templateUrl: './mapfre-footer.component.html',
  styleUrls: ['./mapfre-footer.component.scss'],
})
export class MapfreFooterComponent {
  @Input() cssClass : 'footer-inversion' | 'background-grey' ;
  constructor() { }

}
