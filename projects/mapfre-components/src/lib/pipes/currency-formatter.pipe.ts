import { Injectable, Pipe, PipeTransform } from '@angular/core';

export enum PipeFormatConstant {
  DECIMALS_DEFAULT = 2,
  DECIMAL_SEPARATOR_DEFAULT = ',',
  THOUSANDS_SEPARATOR_DEFAULT = '.',
  ROUND_MODE_DEFAULT = 'trunc',
  CURRENCY_DEFAULT = '',
}

export type RoundModes = 'trunc' | 'round';

export interface PipeFormatOptions {
  decimals?: number;
  decimal_separator?: string;
  thousands_separator?: string;
  roundMode?: RoundModes;
  currency?: string;
}

const PADDING = '000000';

@Pipe({
  name: 'currencyFormatter'
})
@Injectable()
export class CurrencyFormatterPipe implements PipeTransform {

  private readonly defaultFormatOpts: PipeFormatOptions;

  constructor() {
    this.defaultFormatOpts = {
      decimals: PipeFormatConstant.DECIMALS_DEFAULT as const,
      decimal_separator: PipeFormatConstant.DECIMAL_SEPARATOR_DEFAULT as const,
      thousands_separator: PipeFormatConstant.THOUSANDS_SEPARATOR_DEFAULT as const,
      roundMode: PipeFormatConstant.ROUND_MODE_DEFAULT as const,
      currency: PipeFormatConstant.CURRENCY_DEFAULT as const
    };
  }

  transform(value: string | number, formatOpts?: PipeFormatOptions, onInput: boolean = false): string {
    const format = { ...this.defaultFormatOpts, ...formatOpts };

    if (typeof value === 'number') {
      value = value.toString().replace('.', format.decimal_separator);
    }

    let [integer, fraction = ''] = (value || '').toString()
      .split(format.decimal_separator);


    if (integer === '') {
      return '';
    }

    if (!onInput && integer === '0' && fraction === '') {
      return integer + format.currency;
    }

    integer = integer.split(format.thousands_separator).join('');
    integer = parseInt(integer, 10).toString();
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, format.thousands_separator);

    let decimal = fraction ? format.decimal_separator + fraction : '';

    if (!onInput) {
      fraction = format.decimals > 0
        ? format.decimal_separator + (fraction + PADDING).substring(0, format.decimals)
        : '';
      decimal = fraction + format.currency;
    }

    return integer === '' ? '' : `${integer}${decimal}`;
  }

  /**
   * This method transform the string adding thousands simbol when needed
   * @param value
   * @param formatOpts
   */
  integerTransform(value: string, formatOpts: PipeFormatOptions): string {
    const format = { ...this.defaultFormatOpts, ...formatOpts };

    // Remove old thousands symbols
    value = value.split(format.thousands_separator).join('');
    // Control unnecessary zeros
    value = parseInt(value, 10).toString();
    // Add thousands symbols
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, format.thousands_separator);
    return value;
  }

  /**
   * This method transform the string controlling max decimals allowed
   * @param value
   * @param formatOpts
   */
  decimalsTransform(value: string, formatOpts: PipeFormatOptions): string {
    const format = { ...this.defaultFormatOpts, ...formatOpts };

    if (value.length > format.decimals) {
      let fraction = value.slice(0, format.decimals);
      const outRangeDecimal = Number(value.charAt(format.decimals));

      // Increase fraction part when round mode is active
      if (format.roundMode === 'round' && outRangeDecimal >= 5) {
        // todo Control when round mode need increase integer part
        fraction = (Number(fraction) + 1).toString();
      }

      // If fraction is bigger than allowed decimals after rounding need increase integer part
      return fraction.length > format.decimals ? '-1' : fraction;
    }
    return value;
  }

  parse(value: string | number, formatOpts?: PipeFormatOptions): number {
    const format = { ...this.defaultFormatOpts, ...formatOpts };
    // todo round mode and trunc

    if (typeof value === 'string') {
      value = Number(value.split(format.thousands_separator).join('').split(format.decimal_separator).join('.'));
    }

    const n: number = Math.pow(10, format.decimals);
    const parsedNumber = Number((Math.floor(value * n) / n).toFixed(format.decimals)).toFixed(format.decimals);
    return +parsedNumber;
  }

  /**
   * This method add currency simbol to input value when required
   * @param value
   * @param formatOpts
   */
  addCurrency(value: string, formatOpts: PipeFormatOptions): string {
    const format = { ...this.defaultFormatOpts, ...formatOpts };

    if (value && format.currency) {
      const bIncludesCurrency = value.includes(format.currency);
      return value + (bIncludesCurrency ? '' : format.currency);
    }
    return value;
  }

  /**
   * This method remove currency simbol to input when required
   * @param value
   * @param formatOpts
   */
  removeCurrency(value: string, formatOpts: PipeFormatOptions): string {
    const format = { ...this.defaultFormatOpts, ...formatOpts };

    if (value && format.currency) {
      return value.split(format.currency).join('');
    }
    return value;
  }
}
