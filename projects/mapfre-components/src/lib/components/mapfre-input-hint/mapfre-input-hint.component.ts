import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-mapfre-input-hint',
  templateUrl: './mapfre-input-hint.component.html',
  styleUrls: ['./mapfre-input-hint.component.scss'],
  host: {
    '[class.state-error]': 'type==="error"',
    '[class.state-success]': 'type==="success"'
  }
})
export class MapfreInputHintComponent {
  @Input() type: 'success' | 'error' | 'hint' = 'hint';
  @Input() text: string;
}
