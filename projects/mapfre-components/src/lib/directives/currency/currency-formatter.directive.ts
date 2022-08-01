import { Directive, HostListener, OnInit } from '@angular/core';
import {
  CurrencyFormatterPipe,
  PipeFormatOptions,
} from '../../pipes/currency-formatter.pipe';
import { MapfreInputComponent } from '../../components/mapfre-input/mapfre-input.component';

@Directive({
  selector: '[currency-formatter]',
})
export class CurrencyFormatterDirective implements OnInit {
  private formatOpts: PipeFormatOptions;
  private prevValue: string = '';

  constructor(
    private hostComponent: MapfreInputComponent,
    private formatterPipe: CurrencyFormatterPipe
  ) {}

  ngOnInit() {
    // Get host component options
    this.formatOpts = this.hostComponent.formatOpts;
  }

  @HostListener('focusin', ['$event.target.value'])
  onFocusin(value: string) {
    // On focusin remove currency simbol if needed
    const calcValue = this.formatterPipe.removeCurrency(value, this.formatOpts);
    this.setInputValue(calcValue);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const inputEl: HTMLInputElement = this.hostComponent.inputEl.nativeElement;

    // Search pressed letter.
    const startAt = inputEl.selectionStart;
    const endAt = inputEl.selectionEnd;

    const pressedLetter = value.slice(startAt - 1, endAt);

    // Encode pressed letter with *
    value = this.replaceBetween(value, startAt - 1, endAt, '*');

    const checkResult = this.checkPressedCharacter(pressedLetter, value);

    // If pressed letter is not allowed restore previous value
    if (!checkResult) {
      this.setInputValue(this.prevValue);
      return;
    }

    // Replace old thousands.
    value = value.split(this.formatOpts.thousands_separator).join('');

    // Replace old decimals if pressed letter is new decimal sign.
    if (this.isDecimalKey(pressedLetter)) {
      value = value.split(this.formatOpts.decimal_separator).join('');
    }

    // Turn visible encoded value by pressed letter.
    let calcValue = value.replace(
      '*',
      checkResult === this.formatOpts.decimal_separator
        ? this.formatOpts.decimal_separator
        : pressedLetter
    );

    if (this.isDecimalKey(pressedLetter)) {
      let [integer = '', fraction = ''] = calcValue.split(
        this.formatOpts.decimal_separator
      );

      // Control decimals
      fraction = this.formatterPipe.decimalsTransform(
        fraction,
        this.formatOpts
      );

      //  Control overflow when rounding
      if (fraction === '-1') {
        integer = (Number(integer) + 1).toString();
      }

      // Add thousands to integer part
      integer = this.formatterPipe.integerTransform(
        integer || '0',
        this.formatOpts
      );

      // Update new value
      calcValue =
        fraction === '-1'
          ? integer
          : integer + this.formatOpts.decimal_separator + fraction;

      this.setInputValue(calcValue);
      return;
    }

    this.setInputValue(
      this.formatterPipe.transform(calcValue, this.formatOpts, true)
    );
  }

  @HostListener('focusout', ['$event.target.value'])
  onFocusout(value: string) {
    // On focusout add currency simbol if needed
    const calcValue = this.formatterPipe.addCurrency(value, this.formatOpts);
    this.setInputValue(calcValue);
  }

  @HostListener('change', ['$event.target.value'])
  onChange(value: string) {
    const calcValue = this.formatterPipe.transform(value, this.formatOpts);
    this.setInputValue(calcValue);
  }

  @HostListener('beforeinput', ['$event'])
  onBeforeinput($event: InputEvent) {
    if (this.checkIsDefaultActionInputType($event.inputType)) {
      return;
    }

    // Control allowed pressed key
    return $event.data ? this.isCurrencyAllowedKey($event.data) : false;
  }

  /**
   * Return if valid key is pressed for currency inputs
   * @param key
   */
  private isCurrencyAllowedKey(key: string) {
    // Control allowed decimals keys
    const decimalKeys = this.formatOpts.decimals > 0 ? ',.' : '';

    // Regex number and decimal keys
    const regex = new RegExp(`^[\\d${decimalKeys}]*$`);

    return key.match(regex) !== null;
  }

  private checkPressedCharacter(pressedLetter: string, value: string) {
    const fraction = value.split(this.formatOpts.decimal_separator)[1] || '';

    if (this.isDecimalKey(pressedLetter)) {
      // Add decimal separator
      return this.formatOpts.decimal_separator;
    }

    // Control max decimals, avoid adding more decimals than allowed
    if (
      this.formatOpts.decimals > 0 &&
      fraction.length > this.formatOpts.decimals
    ) {
      return false;
    }

    // Add valid key
    return true;
  }

  /**
   * Set input value
   * @param value New value
   */
  private setInputValue = (value: string) => {
    this.prevValue = value;

    // Update component value
    (this.hostComponent as any).value = value;

    // Update native input value
    this.hostComponent.inputEl.nativeElement.value = value;
  };

  /**
   * Replace substring between start and end indexes
   * @param origin Origin string
   * @param startIndex Start index
   * @param endIndex End index
   * @param insertion New substring
   */
  private replaceBetween = (
    origin: string,
    startIndex: number,
    endIndex: number,
    insertion: string
  ): string =>
    `${origin.substring(0, startIndex)}${insertion}${origin.substring(
      endIndex
    )}`;

  /**
   * Check if pressed letter is decimal separator
   * @param letter Pressed letter
   */
  private isDecimalKey = (letter: string): boolean =>
    letter === '.' || letter === ',';

  private checkIsDefaultActionInputType = (inputType: string) => {
    // Manage delete command actions
    if (inputType.includes('delete')) {
      return true;
    }
    if (
      inputType.includes('historyUndo') ||
      inputType.includes('historyRedo')
    ) {
      return true;
    }
    // Other default valid actions
    return false;
  };
}
