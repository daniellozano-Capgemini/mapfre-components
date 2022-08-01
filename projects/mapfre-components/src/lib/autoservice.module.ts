import { NgModule } from '@angular/core';
import { COMPONENTS } from './autoservice.components.constant';
import { MODULES, PROVIDERS } from './autoservice.modules.constant';

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: MODULES,
  providers: PROVIDERS
})
export class AutoServiceLibraryModule { }
