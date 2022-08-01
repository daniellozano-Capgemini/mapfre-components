export interface ItemAmount {
	value: number | string;
  decimals: number;
  format?: 'currency' | 'decimal' | 'stringToCurrency' | 'stringToDecimal';
  decimalFormat?: boolean;
  currency?: string;
  color?: boolean;
}
