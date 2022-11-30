import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ObservedValueOf } from 'rxjs';
import { CompanyDataComponent } from './shared/forms/form-groups/company-data/company-data.component';
import { CorrespondenceDataComponent } from './shared/forms/form-groups/correspondence-data/correspondence-data.component';

interface CompanyForm {
  companyData?: ObservedValueOf<CompanyDataComponent["formReady"]>;
  companyAddress?: ObservedValueOf<CorrespondenceDataComponent["formReady"]>;
  correspondenceAddress?: ObservedValueOf<CorrespondenceDataComponent["formReady"]>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = this.fb.group<CompanyForm>({});

  constructor(private fb: FormBuilder) {
    // setTimeout(() => console.log(this.form), 15000);
  }

  addChildForm<K extends keyof CompanyForm>(
    name: K,
    group: Exclude<CompanyForm[K], undefined>
  ) {
    this.form.setControl(name, group);
  }
}
