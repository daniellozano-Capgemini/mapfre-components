import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import { NgxIbanModule } from 'ngx-iban';
import { RouterModule } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { CurrencyFormatterPipe } from './currency-formatter.pipe';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatListModule,
  MatStepperModule,
  MatRadioModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatCardModule,
  NgSelectModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatCheckboxModule,
]

const MODULES = [
  CdkAccordionModule,
  CommonModule,
  RouterModule,
  FormsModule,
  NgxIbanModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  ...MATERIAL_MODULES
]

const PROVIDERS = [
  {provide: DateAdapter, useClass: CustomDateAdapter },
  CurrencyFormatterPipe
]
export { MODULES , PROVIDERS}
