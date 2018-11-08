import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';

import { FsIconPickerModule } from 'fs-icon-picker';

import { AppMaterialModule } from './material.module';
import {
  DialogExampleComponent,
  PickerComponent,
  ExamplesComponent } from './components';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsIconPickerModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    DialogExampleComponent,
    PickerComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
