import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FsClearModule } from '@firestitch/clear';

import { DialogComponent } from './components/dialog/dialog.component';
import { IconDialog } from './services/icon-dialog.service';

import { FsIconPickerComponent } from './components/fs-icon-picker/fs-icon-picker.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientJsonpModule,
    HttpClientModule,
    FormsModule,
    FsClearModule
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
