import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FsClearModule } from '@firestitch/clear';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { DialogComponent } from './components/dialog/dialog.component';
import { IconDialog } from './services/icon-dialog.service';

import { FsIconPickerComponent } from './components/fs-icon-picker/fs-icon-picker.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({ exports: [
        DialogComponent,
        FsIconPickerComponent
    ],
    declarations: [
        DialogComponent,
        FsIconPickerComponent
    ], imports: [FormsModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        FsClearModule,
        FsSkeletonModule], providers: [
        IconDialog,
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    ] })
export class FsIconPickerModule {
  static forRoot(): ModuleWithProviders<FsIconPickerModule> {
    return {
      ngModule: FsIconPickerModule,
      providers: [IconDialog]
    };
  }
}
