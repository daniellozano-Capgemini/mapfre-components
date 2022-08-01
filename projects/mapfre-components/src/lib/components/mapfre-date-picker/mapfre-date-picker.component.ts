import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { DatePickerConstant, DatePickerOptions } from './model';
import { MapfreDatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';
import { MapfreDatePickerService } from './service';
import { FormGroup } from '@angular/forms';
import { CustomDateAdapter } from '../custom-date-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
};

@Component({
  selector: 'lib-mapfre-date-picker',
  templateUrl: './mapfre-date-picker.component.html',
  styleUrls: ['./mapfre-date-picker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class MapfreDatePickerComponent implements OnInit {
  @Input() opts: Partial<DatePickerOptions>;
  @Output() onSelectDate: EventEmitter<moment.Moment>;
  @Output() isValid: EventEmitter<boolean>;

  @ViewChild('datepickerFooter', { static: false }) datepickerFooter: ElementRef;
  @ViewChild('datepicker', { static: false }) datepicker: MatDatepicker<any>;
  @Input() dateInit: Date;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() disabled: boolean = false;
  @Input() placeholder: string;
  @Input() noPadding: boolean;
  @Input() padding16: boolean;
  @Input() padding8: boolean;
  @Input() resetForm: boolean = false;

  @Input() set date(date) {
    this.formGroup?.controls?.date?.setValue(date);
  }

  defaultOpts: Partial<DatePickerOptions>;
  value: moment.Moment;
  previousValue: moment.Moment;
  touched: boolean;
  formGroup: FormGroup;
  datePickerHeader: typeof MapfreDatePickerHeaderComponent;

  closeMethod: () => void;

  constructor(
    @Inject(MAT_DATE_FORMATS)
    private readonly dateFormats: MatDateFormats,
    private readonly adapter: DateAdapter<any>,
    private readonly datePickerService: MapfreDatePickerService
  ) {
    moment.locale(this.opts?.locale || DatePickerConstant.LOCALE_DEFAULT);
    this.value = moment(new Date());
    this.onSelectDate = new EventEmitter<moment.Moment>();
    this.isValid = new EventEmitter<boolean>();
    this.touched = false;
    this.defaultOpts = this.datePickerService.getDefaultOpts();
  }

  ngOnInit() {
    this.adapter.setLocale(this.opts?.locale || DatePickerConstant.LOCALE_DEFAULT);
    this.opts = { ...this.defaultOpts, ...this.opts };
    this.datePickerService.setOptions(this.opts);
    this.datePickerHeader = this.datePickerService.getDatePickerHeader(this.opts);
    this.formGroup = this.datePickerService.createForm(this.opts);
    if (this.dateInit) {
      this.formGroup?.controls?.date?.setValue(this.dateInit);
      this.value = moment(new Date(this.dateInit));
    }
  }

  ngOnChanges({ resetForm }: SimpleChanges) {
    if (resetForm && this.resetForm) {
      this.reset();
    }
  }
  success() {
    this.datepicker.close = this.closeMethod;
    this.datepicker.close();
    this.onSelectDate.emit(this.value);
    const isValid = moment(this.value, this.dateFormats.display.dateInput, true).isValid();
    this.isValid.emit(isValid);
  }

  openCalendar() {
    if (!this.closeMethod) this.closeMethod = this.datepicker.close;
    this.previousValue = this.value;
    this.datepicker.open();
    this.datepicker.close = this.opts.close;
    this.appendFooter();
  }

  onChangeDate($event: MatDatepickerInputEvent<string>) {
    const date = moment($event.value, this.dateFormats.display.dateInput, true);
    const isValid = moment(date).isValid();
    if (isValid) {
      this.value = date;
      this.touched = true;
    }
    this.formGroup?.controls?.date?.setValue(isValid ? this.value : null);
    this.formGroup.updateValueAndValidity();
  }

  onChange($event) {
    const date = moment($event.target.value, this.dateFormats.display.dateInput, true);
    const isValid = moment(date).isValid();
    if (isValid) {
      this.value = date;
      this.touched = true;
    }
    this.formGroup?.controls?.date?.setValue(isValid ? this.value : null);
    this.formGroup.updateValueAndValidity();
    this.onSelectDate.emit(isValid ? this.value : null);
    this.isValid.emit(isValid);
  }

  onDateInput(event) {
    if (typeof event.value?._i !== 'string') { return;}
    const date = moment(event.target.value, this.dateFormats.display.dateInput, true);
    const isValid = moment(date).isValid() && !event.value._i.includes('_');
    if (isValid) {
      this.onChange(event);
    }
  }

  cancel() {
    this.value = this.previousValue;
    this.formGroup?.controls?.date?.setValue(this.value);
    this.formGroup.updateValueAndValidity();
    this.datepicker.close = this.closeMethod;
    this.datepicker.close();
  }

  reset() {
    this.formGroup.reset();
  }

  private appendFooter() {
    setTimeout(() => {
      const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
      matCalendar?.appendChild(this.datepickerFooter?.nativeElement);
    });
  }
}
