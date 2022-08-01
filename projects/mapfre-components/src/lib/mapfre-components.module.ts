import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIbanModule } from 'ngx-iban';
import { CustomDateAdapter } from './common/custom-date-adapter';
import {
  MapfreHeaderComponent,
  MapfreTabMenuComponent,
  MapfreItemAccordionComponent,
  MapfreTabsComponent,
  MapfreButtonToggleComponent,
  MapfreSwitchToggleComponent,
  MapfreSelectMenuComponent,
  MapfreButtonComponent,
  MapfreProgressComponent,
  MapfreStepsComponent,
  MapfreGreyBoxComponent,
  MapfreListComponent,
  MapfreInputComponent,
  MapfreInputHintComponent,
  MapfreStarRatingComponent,
  MapfreAlertMessageComponent,
  MapfreItemComponent,
  MapfreInputSelectComponent,
  MapfreRadioComponent,
  MapfreHighlightComponent,
  MapfreAmountComponent,
  MapfreSigningKeyComponent,
  MapfreAlertComponent,
  MapfreCardComponent,
  MapfreResultComponent,
  MapfreCardHeaderComponent,
  MapfreCardBodyComponent,
  MapfreCardFooterComponent,
  MapfreIconComponent,
  MapfreFooterComponent,
  MapfreDatePickerComponent,
  MapfreDatePickerHeaderComponent,
  MapfreContentComponent,
  MapfreGridComponent,
  MapfreCheckboxComponent,
  MapfreTextAreaComponent,
  MapfreMenuComponent,
  MapfreTopListComponent,
  MapfreAutocompleteComponent,
} from './components';
import { MATERIAL_MODULES } from './material.module';
import { CurrencyFormatterPipe } from './pipes/currency-formatter.pipe';

const MODULES = [
  CdkAccordionModule,
  NgxIbanModule,
  NgSelectModule,
  TranslateModule,
  ...MATERIAL_MODULES,
];

const PROVIDERS = [
  { provide: DateAdapter, useClass: CustomDateAdapter },
  CurrencyFormatterPipe,
];

const COMPONENTS = [
  MapfreHeaderComponent,
  MapfreTabMenuComponent,
  MapfreItemAccordionComponent,
  MapfreTabsComponent,
  MapfreButtonToggleComponent,
  MapfreSwitchToggleComponent,
  MapfreSelectMenuComponent,
  MapfreButtonComponent,
  MapfreProgressComponent,
  MapfreStepsComponent,
  MapfreGreyBoxComponent,
  MapfreListComponent,
  MapfreInputComponent,
  MapfreInputHintComponent,
  MapfreStarRatingComponent,
  MapfreAlertMessageComponent,
  MapfreItemComponent,
  MapfreInputSelectComponent,
  MapfreRadioComponent,
  MapfreHighlightComponent,
  MapfreAmountComponent,
  MapfreSigningKeyComponent,
  MapfreAlertComponent,
  MapfreCardComponent,
  MapfreResultComponent,
  MapfreCardHeaderComponent,
  MapfreCardBodyComponent,
  MapfreCardFooterComponent,
  MapfreIconComponent,
  MapfreFooterComponent,
  MapfreDatePickerComponent,
  MapfreDatePickerHeaderComponent,
  MapfreContentComponent,
  MapfreGridComponent,
  MapfreCheckboxComponent,
  MapfreTextAreaComponent,
  MapfreMenuComponent,
  MapfreTopListComponent,
  MapfreAutocompleteComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    ...MODULES,
  ],
  exports: [...COMPONENTS],
  providers: [...PROVIDERS],
})
export class MapfreComponentsModule {}
