import { ItemAmount } from "../mapfre-amount/mapfre-amount.interface";

export interface ItemHighlight {
  title: string;
  type?: 'inversion' | 'savings' | 'pensions';
  iconRight?: string;
  iconRightHasClick?: boolean;
  highlightText?: string;
  date: string;
  list?: any[];
  amount: ItemAmount,
  textReplaceZeroAmount?:  string;
  header?:  string;
  subHeader?:  string;
}

export interface List {
  name: string;
  url: string;
}
