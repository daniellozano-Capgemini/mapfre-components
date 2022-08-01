import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { AbstractValueAccessor, MakeProvider } from '../common/abstract-value-accessor';
import { InputFormatOptions, InputMode, InputType } from './model';
import { PipeFormatOptions } from '../currency-formatter.pipe';

@Component({
  selector: 'lib-mapfre-input',
  templateUrl: './mapfre-input.component.html',
  styleUrls: ['./mapfre-input.component.scss'],
  providers: [MakeProvider(MapfreInputComponent)]
})
export class MapfreInputComponent extends AbstractValueAccessor implements OnInit {
  @Input() type: InputType = 'text';
  @Input() label: string;
  @Input() onlyNumbers: boolean;
  @Input() alphaNumeric: boolean;
  @Input() placeholder = '';
  @Input() required: boolean;
  @Input() maxlength: string | number;
  @Input() minlength: string | number;
  @Input() dniMayus?: boolean;
  @Input() showCurrencyInInput?: boolean;
  @Input() iconPlace: 'left' | 'right' = 'right';
  @Input() iconColor: string;
  @Input() inputMode: InputMode;
  @Input() autocomplete: MatAutocomplete;
  @Input() keypressFn: Function;
  @Input() formatOpts: InputFormatOptions;

  @Output() isFocused: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() iconClick = new EventEmitter();
  @Output() dataChanged: EventEmitter<string> = new EventEmitter<string>();


  @HostBinding('class.state-disabled') @Input() disabled: boolean = false;
  @HostBinding('class.state-readonly') @Input() readonly: boolean = false;
  @HostBinding('class.has-icon') @Input() icon: string;

  @ViewChild('nativeInput') inputEl: ElementRef;

  private defaultFormatOpts: PipeFormatOptions = {
    decimals: 2,
    decimal_separator: ',',
    thousands_separator: '.',
    roundMode: 'trunc',
    currency: ''
  };

  // Native input type.
  nativeInputType;
  previusValue = '';
  numero = '';
  decimal = '';
  coma: string;

  constructor(public renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    this.prepareNativeInput();

    if (this.type === 'currencytemp') {
      // Force input mode decimal for currency inputs
      this.inputMode = 'decimal';

      // Set input format options
      this.formatOpts = { ...this.defaultFormatOpts, ...this.formatOpts };
    }
  }

  ngAfterViewInit(): void {
    if (this.maxlength) this.inputEl.nativeElement.setAttribute('maxlength', this.maxlength);
    if (this.minlength) this.inputEl.nativeElement.setAttribute('minlength', this.minlength);
  }

  onKeydown($event: KeyboardEvent) {
    if (this.onlyNumbers) return this.isNumber($event);
    if (this.alphaNumeric) {
      const regExp = new RegExp('[A-Za-z0-9ñÑ ]');
      return regExp.test($event?.key);
    }
  }

  prepareNativeInput() {
    const customTypes = { iban: 'text', isin: 'text', currency: 'text' };
    this.nativeInputType = customTypes[this.type] || this.type;

    // Todo tested and working without this line.
    // if (this.type === 'iban' && this.inputEl) this.renderer.setAttribute(this.inputEl.nativeElement, "ngxIban", '');
  }

  onInput($event: Event) {
    if (this.type === 'currencytemp') return;

    if (this.type === 'currency') {
      $event.target['value'] = $event.target['value'].toLowerCase().replace(/[a-z]/g, '');
      $event.target['value'] = $event.target['value'].toLowerCase().replace(/[^\w\s\,]/gi, '');

      // Fuente: https://www.iteramos.com/pregunta/18285/javascript-regexp-eliminar-todos-los-caracteres-especiales;
      this.resetAndSetNum($event);

      this.previusValue = this.coma !== '' ? this.formatearPositiveNumToThousands(this.numero) + this.coma + this.decimal : this.formatearPositiveNumToThousands(this.numero);
      $event.target['value'] = this.previusValue;
      this.value = this.previusValue;
    } else if (this.type === 'iban') {
      this.value = this.formatIban($event.target['value']);
    } else if (this.type === 'email') {
      this.value = $event.target['value'].toLowerCase();
    }
    else {
      this.value = this.dniMayus ? $event.target['value']?.toUpperCase() : $event.target['value'];
    }
    this.onTouched();
    this.onChange(this.value);
  }

  resetAndSetNum(e) {
    this.numero = e.target['value'];
    this.decimal = '';
    this.coma = '';
    if (e.target['value'].includes(',')) {
      this.coma = ',';
      this.numero = e.target['value'].split(',')[0];
      this.decimal = e.target['value'].split(',')[1] ? e.target['value'].split(',')[1].trim() : '';
      this.decimal = this.decimal.length > 1 ? Array.from(this.decimal)[0] + Array.from(this.decimal)[1] : this.decimal;
    }
    this.numero = this.numero.replace(/[.]/g, '');
  }

  checkNumberOfSymbol(symbol, cadena) {
    const array = Array.from(cadena);
    const filt = array.filter(ele => ele === symbol);
    return filt.length;
  }

  onIconClick($event) {
    if (this.iconClick.observers.length) { $event.stopPropagation(); }

    if (!this.disabled) {
      this.iconClick.emit();
    }
  }

  private isNumber($event: any) {
    const charCode = $event.which ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // Formatear un numero 1231: 1.231
  formatearPositiveNumToThousands(num: string): string {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Formatear un numero que tiene o no decimales pero autocompletamos hasta 2 si no tiene 11.111 = 11.111,00
  autoCompleteDecimals(num: string, showCurrencyInInput: boolean, coin: string): string {
    let value = num;
    const valueHaveComma = value.includes(',') && value.split(',')[1] ? value.split(',')[1] : '';
    const autoCompleteValue = valueHaveComma.length === 0 ? '00' : valueHaveComma.length === 1 ? valueHaveComma + '0' : valueHaveComma;
    value = valueHaveComma.length > 0 ? value.split(',')[0] + ',' + autoCompleteValue : value.includes(',') ? value + autoCompleteValue : value + ',' + autoCompleteValue;
    return showCurrencyInInput ? value + coin : value;
  }

  focus(event: FocusEvent) {
    this.isFocused.emit(false);
  }

  onDataChanged(event) {
    (event.value || event.value === '') ? this.dataChanged.emit(event.value) : this.dataChanged.emit(event);
  }

  formatIban(iban: string): string {
    const splitChars = iban.split(' ').join('').split('');

    let finalIBAN = '';

    splitChars.forEach((c, i) => {
      if (i > 0 && i % 4 === 0) {
        finalIBAN += ' ';
      }
      finalIBAN += c;
    });
    return finalIBAN.toUpperCase();
  }
}
