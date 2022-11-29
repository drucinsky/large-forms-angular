import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyDataComponent } from './shared/forms/form-groups/company-data/company-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorrespondenceDataComponent } from './shared/forms/form-groups/correspondence-data/correspondence-data.component';
import { CompanyRepresentantFormArrayComponent } from './shared/forms/form-array/company-representant/company-representant-form-array.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CompanyDataComponent,
    CorrespondenceDataComponent,
    CompanyRepresentantFormArrayComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
