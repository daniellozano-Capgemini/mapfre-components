export enum DatePickerConstant {
    LOCALE_DEFAULT = 'es',
    APPEARANCE_DEFAULT = 'outline',
    ICON_DEFAULT = 'calendar',
    ICON_SIZE_DEFAULT = 'm',
    HEADER_TITLE_DEFAULT_TEXT = 'Fecha',
    HEADER_PLACEHOLDER_DEFAULT_TEXT = 'Selecciona una fecha',
    ACCEPT_BTN_DEFAUL_TEXT = 'Aceptar',
    CANCEL_BTN_DEAFAUL_TEXT = 'Cancelar',
}

export interface DatePickerOptions {
    locale: string;
    placeholder: string;
    required: boolean;
    appearance: Appearances;
    icon: string;
    size: IconSizes;
    header: Partial<DatePickerHeader>;
    acceptButton: Partial<DatePickerButton>;
    cancelButton: Partial<DatePickerButton>;
    readonly close: () => void;
}

export interface DatePickerButton {
    show: boolean,
    text: string
}

export interface DatePickerHeader {
    show: boolean,
    title: {
        show: boolean,
        text: string
    }
}

export type IconSizes = 'xs' | 's' | 'm' | 'l' | 'xl';

export type DatePickerToggleMode = 'month' | 'year';

export type Appearances = 'outline' | 'legacy' | 'standard' | 'fill';

export enum DatePickerMomentTypes {
    MONTH = 'month',
    YEAR = 'month',
    LONG = 'long',
}

