import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataSelectMenu } from '../mapfre-select-menu/mapfre-select-menu.component';
import { StockCardInputModel, StockCardModel } from './mapfre-grid.model';

@Component({
  selector: 'lib-mapfre-grid',
  templateUrl: './mapfre-grid.component.html',
  styleUrls: ['./mapfre-grid.component.scss'],
})
export class MapfreGridComponent implements OnInit {

  public dataHtml: StockCardModel;

  @Input() data: StockCardInputModel;
  @Input() array: [];

  public card = {
    value: 'Valor',
    valueNumber: '12.335,82',
    valueNumberSmall: '',
    pg: 'PG',
    pgNumber: '999,99',
    pgNumberSmall: '',
    currency: 'DIVISA',
    currencyValue: 'EUR'
  };

  public totalValueNumber: any;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    const planTypes = {
      cotizacion: (data) => {
        return {
          info: this.data.fields[4],
          currency: data.fields[5]
        }
      },

      plan: (data) => {
        return {
          stocks: [data.fields[4], data.fields[5], data.fields[6], data.fields[7]],
          periods: data.periods
        }
      },
    }

    this.dataHtml = {
      type: this.data?.type,
      name: this.data.fields[0],
      periods: this.data.periods,
      description: this.data.fields[1],
      value: this.data.fields[2],
      date: this.data.fields[3],
      ...planTypes[(this.data?.type === 'fondo' ? 'plan' : this.data?.type)](this.data)
    };

    const arrValue = this.card.valueNumber.split(',');
    this.card.valueNumber = arrValue[0];
    this.card.valueNumberSmall = arrValue[1];

    const arrPg = this.card.pgNumber.split(',');
    this.totalValueNumber = arrPg[0];
    this.card.pgNumber = arrPg[0];
    this.card.pgNumberSmall = arrPg[1];
  }

  goToDetail(clickedFondo: StockCardInputModel) {
    //TODO
    let params = {
      pageTitle: clickedFondo.fields[0],
      inversionId: clickedFondo.id,
      type: clickedFondo.type
    }
    this.navCtrl.navigateForward(`fondos-inversion-detalle/${params.inversionId}`, {
      state: params
    });
  }

}
