import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogComponent } from './components/dialog/dialog.component';
import { IconDialog } from './services';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { FsIconPickerComponent } from './components/fs-icon-picker';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientJsonpModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    DialogComponent,
    FsIconPickerComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    DialogComponent,
    FsIconPickerComponent
  ],
  providers: [
    IconDialog,
  ],
})
export class FsIconPickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsIconPickerModule,
      providers: [IconDialog]
    };
  }
}
