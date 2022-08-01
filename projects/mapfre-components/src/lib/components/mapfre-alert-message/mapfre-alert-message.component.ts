import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataAlertMessage } from './mapfre-alert-message.interface';

@Component({
  selector: 'lib-mapfre-alert-message',
  templateUrl: './mapfre-alert-message.component.html',
  styleUrls: ['./mapfre-alert-message.component.scss'],
})
export class MapfreAlertMessageComponent implements OnInit{
  @Input() dataAlertMessage: DataAlertMessage;
  @Input() colorAlertMessage: string;
  @Input() inLine = false;
  @Input() wordsLimit = 100;
  @Input() textCutted = false;
  public cutText = false;
  public parcialMessage: string;
  public readText = 'planes.info.alert.button-more';
  public readIcon = 'simple-arrow-down';
  showAllText: boolean;


  @Output() action = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.textCutted) {
      const words = this.dataAlertMessage?.messages[0]?.message?.split(' ');
      this.cutText = words?.length > this.wordsLimit;
      this.parcialMessage = words?.slice(0, this.wordsLimit)?.join(' ');
      this.parcialMessage = this.cutText ? `${this.parcialMessage}...` : this.parcialMessage
    }
  }

  onAction(): void{
    this.action.emit();
  }

  readMore() {
    if (this.showAllText) {
      this.showAllText = false;
      this.textCutted = true;
      this.readText = 'planes.info.alert.button-more';
      this.readIcon = 'simple-arrow-down'
    } else {
      this.showAllText = true;
      this.textCutted = false;
      this.readText = 'planes.info.alert.button-less';
      this.readIcon = 'simple-arrow-up'
    }
  }
}
