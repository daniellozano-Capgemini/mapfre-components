import { ItemAccordion } from "../mapfre-item-accordion/mapfre-item-accordion.interface";

export interface Menu {
  id: string;
  items: ItemAccordion[];
  links?: MenuLinks[];
}

export interface MenuLinks {
  title: string;
  link: string;
  icon: string;
  id?: string;
  option?: MenuFooterOption;
}

export interface MenuFooterOption {
  icon?: string;
  iconImg?: string;
  text?: string;
  page?: any;
  url?: string;
  type?: string;
  id: string;
  subOptions?: MenuFooterOption[];
}

export interface UserName {
  name: string;
  surname: string;
}
