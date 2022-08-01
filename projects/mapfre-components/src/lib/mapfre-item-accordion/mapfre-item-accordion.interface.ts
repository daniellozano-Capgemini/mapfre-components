import { DataList } from '../mapfre-list/mapfre-list.interface';

export interface ItemAccordion {
  title: string;
  itemRight?: string;
  itemLeft: string;
  subtitle?: Link[];
  collapse?: boolean;
  description?: string;
  link?: string;
  dataList?: DataList;
  titleButton: boolean;
  innerHTML?: string;
  id?: string;
  option?: Option;
  buttonInfo?: boolean;
}

export interface Link {
  title: string;
  url?: string;
  value?: string | number;
  icon?: string;
  id?: string;
  isNavigateRoot?: boolean;
}

export interface Option {
  icon?: string;
  iconImg?: string;
  text: string;
  subText?: string;
  subIcon?: string;
  page?: any;
  url?: string;
  selected?: boolean;
  id?: string;
  badgeNumber?: number;
}
