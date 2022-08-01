import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mapfre-icon',
  templateUrl: './mapfre-icon.component.html',
  styleUrls: ['./mapfre-icon.component.scss'],
})
export class MapfreIconComponent implements OnInit {

  @Input() icon: string;
  @Input() size: 'xs' | 's' | 'sm' | 'm' | 'l' | 'c40' | 'c16' | 'c56' | 'xl' = 'm';
  @Input() customClass: string;

  constructor() { }

  ngOnInit() {}

}
