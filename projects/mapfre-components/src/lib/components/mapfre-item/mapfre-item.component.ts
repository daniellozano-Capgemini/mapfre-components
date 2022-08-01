import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-mapfre-item',
  templateUrl: './mapfre-item.component.html',
  styleUrls: ['./mapfre-item.component.scss'],
})
export class MapfreItemComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() icon: string;
  @Input() url?: string;
  @Input() iconNavigate?: boolean = true;
  @Input() notification?: boolean = false;
  @Output() iconRight: EventEmitter<string> = new EventEmitter();
  @Output() onUrl: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit() { }

  onClick() {
    this.iconRight.emit(this.title);
    if (this.url) {
      this.onUrl.emit(this.url);
    }
  }
}
