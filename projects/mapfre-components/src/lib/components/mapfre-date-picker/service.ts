import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MapfreDatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';
import { DatePickerConstant, DatePickerOptions } from './model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class MapfreDatePickerService {

    constructor(private formBuilder: FormBuilder) {

    }

    onSetOption$: Subject<Partial<DatePickerOptions>>;

    createForm(opts: Partial<DatePickerOptions>): FormGroup {
        return this.formBuilder.group({
            date: [null, opts.required ? [Validators.required] : []]
        });
    }

    getDefaultOpts() {
        const opts: Partial<DatePickerOptions> = {
            locale: DatePickerConstant.LOCALE_DEFAULT,
            required: true,
            appearance: DatePickerConstant.APPEARANCE_DEFAULT,
            placeholder: DatePickerConstant.HEADER_PLACEHOLDER_DEFAULT_TEXT,
            icon: DatePickerConstant.ICON_DEFAULT,
            size: DatePickerConstant.ICON_SIZE_DEFAULT,
            header: {
                show: true,
                title: {
                    show: true,
                    text: DatePickerConstant.HEADER_TITLE_DEFAULT_TEXT
                }
            },
            acceptButton: {
                show: true,
                text: DatePickerConstant.ACCEPT_BTN_DEFAUL_TEXT
            },
            cancelButton: {
                show: true,
                text: DatePickerConstant.CANCEL_BTN_DEAFAUL_TEXT
            },
            close: () => { }
        }

        return opts;
    }

    setOptions(opts: Partial<DatePickerOptions>) {
        this.onSetOption$ = new BehaviorSubject<Partial<DatePickerOptions>>(opts);
    }

    getOptions() {
        return this.onSetOption$.asObservable();
    }

    getDatePickerHeader(opts: Partial<DatePickerOptions>): typeof MapfreDatePickerHeaderComponent {
        return opts?.header?.show === false ? null : MapfreDatePickerHeaderComponent;
    }

}
