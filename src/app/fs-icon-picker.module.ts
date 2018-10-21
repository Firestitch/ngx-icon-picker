import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FsComponentComponent } from './components/fs-component/fs-component.component';
import { IconDialog } from './services';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';

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
    FsComponentComponent,
  ],
  entryComponents: [
    FsComponentComponent
  ],
  declarations: [
    FsComponentComponent,
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
