import { TestBed } from "@angular/core/testing";
import { FormBuilder, Validators } from "@angular/forms";
import { DatePickerConstant, DatePickerOptions } from "./model";
import { MapfreDatePickerService } from "./service";

const defaultOpts: Partial<DatePickerOptions> ={
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

describe('MapfreDatePickerService', () => {

    let service: MapfreDatePickerService;
    let formBuilderSpy: FormBuilder;

    const spyObj = jasmine.createSpyObj;
    formBuilderSpy = spyObj('FormBuilder', ['group']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                { provide: FormBuilder, useValue: formBuilderSpy },
            ]
        });
        service = TestBed.inject(MapfreDatePickerService);
        formBuilderSpy.group = (params) => { return params }
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('form should be created', () => {
        let form = service.createForm({ required: true });
        expect(form['date'][1]).toEqual([Validators.required]);
        form = service.createForm({ required: false });
        expect(form['date'][1]).toEqual([]);
    });

    it('should return deafult opts', () => {
        const opts = service.getDefaultOpts();
        expect(opts.appearance).toEqual(DatePickerConstant.APPEARANCE_DEFAULT);
    });

    it('options observable should return options', () => {
        service.setOptions(defaultOpts);
        service.getOptions().subscribe(res => {
            expect(res).toEqual(defaultOpts);
        })
    });

    it('should return DatePickerHeader component', () => {
        let component = service.getDatePickerHeader(defaultOpts);
        expect(component.name).toEqual('MapfreDatePickerHeaderComponent');
        const clone: Partial<DatePickerOptions> = { ...defaultOpts, header: { show: false } }
        component = service.getDatePickerHeader(clone);
        expect(component).toBeNull()
    });

});
