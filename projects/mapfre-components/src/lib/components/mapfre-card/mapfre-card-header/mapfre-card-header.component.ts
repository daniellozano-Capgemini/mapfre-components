import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-mapfre-card-header',
  templateUrl: './mapfre-card-header.component.html',
  styleUrls: ['./mapfre-card-header.component.scss'],
})
export class MapfreCardHeaderComponent implements OnInit {

  @Input() headerSectionType: 'inversion' | 'savings' | 'pensions' | 'rentVariable' | 'rentFixed';
  @Input() headerSectionColor: string;
  @Input() title: string;
  @Input() titleAccount: string;
  @Input() titleGdc: boolean;
  @Input() titleAmount: number;
  @Input() class: string;
  @Input() subtitle: string;
  @Input() number: string;
  @Input() cssClass: 'mapfre-grey-text';
  @Input() cssClassTitle: 'mapfre-card-header-title-white';
  @Input() currenctyType: string;
  @Input() numberInteger: number;

  public numberBig;
  public numberSmall;

  constructor() { }

  ngOnInit() {
    if (this.number) {
      const arrPg = this.number.split(',');
      this.numberBig = arrPg[0];
      this.numberSmall = arrPg[1];
    }
  }

}
