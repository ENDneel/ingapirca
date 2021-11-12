import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCalendarModule, NbCardModule, NbButtonGroupModule, NbTabsetModule, NbTimepickerModule, NbRadioModule, NbCheckboxModule, NbLayoutModule,
  NbInputModule, NbButtonModule, NbIconModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbCalendarModule,
    NbCardModule,
    NbButtonGroupModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbRadioModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule
  ],
  exports: [
    NbCalendarModule,
    NbCardModule,
    NbButtonGroupModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbRadioModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule
  ]
})
export class NebularModule { }
