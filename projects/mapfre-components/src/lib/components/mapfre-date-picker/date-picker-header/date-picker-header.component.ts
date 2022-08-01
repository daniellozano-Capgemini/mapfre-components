import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { pipe, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DatePickerConstant, DatePickerMomentTypes, DatePickerOptions, DatePickerToggleMode } from '../model';
import { MapfreDatePickerService } from '../service';

@Component({
  selector: 'lib-date-picker-header',
  templateUrl: './date-picker-header.component.html',
  styleUrls: ['./date-picker-header.component.scss'],
})
export class MapfreDatePickerHeaderComponent<D> implements OnInit {

  opts: Partial<DatePickerOptions>
  locale: string;
  defaultLocale: string;
  subs: Subscription;
  private _destroyed: Subject<void>;

  constructor(
    private datePickerService: MapfreDatePickerService,
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS)
    private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    this._destroyed = new Subject<void>();
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
    this.defaultLocale = DatePickerConstant.LOCALE_DEFAULT;
    this.subs = new Subscription();

  }
  ngOnInit() {
    this.subs.add(this.datePickerService.getOptions()
      .pipe(take(1))
      .subscribe(opts => {
        this.opts = opts;
      }));
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this.subs.unsubscribe();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.parse.dateInput)
      .toLocaleLowerCase();
  }

  getYear() {
    return this._dateAdapter.getYear(this._calendar.activeDate);
  }

  getMonth(): string {
    return new Date(
      this._dateAdapter.getYear(this._calendar.activeDate),
      this._dateAdapter.getMonth(this._calendar.activeDate),
      this._dateAdapter.getDate(this._calendar.activeDate))
      .toLocaleString(this.opts?.locale || this.defaultLocale, { month: DatePickerMomentTypes.LONG });
  }

  getCurrentDay() {
    const selectedDate = new Date(
      this._dateAdapter.getYear(this._calendar?.selected ? this._calendar.selected as D :  this._calendar.activeDate),
      this._dateAdapter.getMonth(this._calendar?.selected ? this._calendar.selected as D :  this._calendar.activeDate),
      this._dateAdapter.getDate(this._calendar?.selected ? this._calendar.selected as D :  this._calendar.activeDate));

    const selectedNumber = this._dateAdapter.getDate(this._calendar?.selected ? this._calendar.selected as D :  this._calendar.activeDate);
    const dayOftheWeek = selectedDate.toLocaleString(this.opts?.locale || this.defaultLocale, { weekday:  DatePickerMomentTypes.LONG  });

    return `${dayOftheWeek}, ${selectedNumber}`;
  }

  previousClicked(mode: DatePickerToggleMode) {
    this._calendar.activeDate =
      mode === DatePickerMomentTypes.MONTH
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: DatePickerToggleMode) {
    this._calendar.activeDate =
      mode === DatePickerMomentTypes.MONTH
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }


}
