import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsIconPickerModule } from '@firestitch/icon-picker';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  DialogExampleComponent,
  PickerComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { FsMessageModule } from '@firestitch/message';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsIconPickerModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsMessageModule.forRoot(),
    FsExampleModule.forRoot(),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    DialogExampleComponent,
    PickerComponent
  ],
})
export class PlaygroundModule {
}
