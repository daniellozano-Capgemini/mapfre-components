export interface StockCardModel {
  type: string;
  name: string;
  description: string;
  value: string;
  date: string;
  stocks?: string[];
  info?: string;
  periods?: string[];
  currency?: string;
}

export interface StockCardInputModel {
  type: 'plan' | 'fondo' | 'cotizacion';
  fields: string[];
  id: number;
  periods?: string[];
  idMercado?: string;
  contratado?: boolean;
  showArrow?: boolean;
  objectToSelect?: any;
  numCuenta?: string;
}
