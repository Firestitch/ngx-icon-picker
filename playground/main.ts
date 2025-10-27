import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsIconPickerModule } from '@firestitch/icon-picker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsMessageModule } from '@firestitch/message';
import { FsExampleModule } from '@firestitch/example';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsIconPickerModule, FormsModule, FsMessageModule.forRoot(), FsExampleModule.forRoot()),
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

