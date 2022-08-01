import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { getLocaleFirstDayOfWeek } from '@angular/common';

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
  constructor(@Inject(LOCALE_ID) public locale: string) {
    super(locale);
  }

  getFirstDayOfWeek() {
    return getLocaleFirstDayOfWeek(this.locale);
  }
}
