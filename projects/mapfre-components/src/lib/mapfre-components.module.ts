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
import { COMPONENTS } from './components';
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
