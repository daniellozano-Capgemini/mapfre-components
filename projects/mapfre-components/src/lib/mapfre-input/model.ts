export enum InputFormatConstant {
  DECIMALS_DEFAULT = 2,
  DECIMAL_SEPARATOR_DEFAULT = ',',
  THOUSANDS_SEPARATOR_DEFAULT = '.',
  ROUND_MODE_DEFAULT = 'trunc',
  CURRENCY_DEFAULT = '',
}

export type InputType = 'text' | 'email' | 'password' | 'iban' | 'isin' | 'currency' | 'currencytemp' | 'select' | 'number' | 'tel';
export type InputMode = 'none' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email' | 'url' | 'text';

export interface InputFormatOptions {
  decimals?: number;
  decimal_separator?: string;
  thousands_separator?: string;
  roundMode?: RoundModes;
  currency?: string;
}

export type RoundModes = 'trunc' | 'round';
