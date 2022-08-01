import { CloseScrollStrategyConfig } from '@angular/cdk/overlay/scroll/close-scroll-strategy';
import { ItemAmount } from '../mapfre-amount/mapfre-amount.interface';

export interface ButtonDataList {
  title: string;
  type: 'primary' | 'link' | 'outline' | 'link-underline' | 'outline-secondary';
}
export interface DataList {
  title: string;
  value?: string | number | string[];
  currency?: string;
  colorValue?: boolean;
  amount?: ItemAmount;
  type?: 'alert' | 'secret';
  button?: ButtonDataList;
  key?: string;
  cssClass?: string;
  values?: string[];
  info?: boolean;
}
