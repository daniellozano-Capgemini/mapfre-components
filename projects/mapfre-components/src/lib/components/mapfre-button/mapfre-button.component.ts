import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'button[lib-mapfre-button]',
  templateUrl: './mapfre-button.component.html',
  styleUrls: ['./mapfre-button.component.scss'],
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.mapfre-button-disabled]': 'disabled',
    '[class.mapfre-button-block]': 'expand === "block"',
    '[class.mapfre-button-primary]': 'type === "primary"',
    '[class.mapfre-button-link]': 'type === "link"',
    '[class.mapfre-button-outline]': 'type === "outline"',
    '[class.mapfre-button-link-underline]': 'type === "link-underline"',
    '[class.mapfre-button-link-bold]': 'type === "link-bold"',
    '[class.mapfre-button-link-bold-dark]': 'type === "link-bold-dark"',
    '[class.mapfre-button-link-dark]': 'type === "link-dark"',
    '[class.mapfre-button-outline-secondary]': 'type === "outline-secondary"',
  },
  inputs: ['expand', 'primary', 'disabled', 'type']
})
export class MapfreButtonComponent implements OnInit {

  @Input() title: string;
  @Input() number: number;
  @Input() type: 'primary' | 'link' | 'outline' | 'link-underline' | 'link-bold' | 'link-bold-dark' | 'link-dark' | 'outline-secondary';
  @Input() expand: 'auto' | 'block' = 'auto';
  @Input() icon: string;
  @Input() iconPosition: 'left' | 'right' = 'right';
  @Input() disabled: boolean = false;
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  constructor() { }

  ngOnInit() { }

}
