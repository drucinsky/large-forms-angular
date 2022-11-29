import { Component, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyRepresentantComponent } from '../../form-groups/company-representant/company-representant.component';
import { ObservedValueOf, of } from 'rxjs';

interface RepresentantForm {
  representative: ObservedValueOf<CompanyRepresentantComponent["formReady"]>;
}

@Component({
  selector: 'app-company-representant-form-array',
  standalone: true,
  imports: [CommonModule, CompanyRepresentantComponent],
  templateUrl: './company-representant-form-array.component.html',
})
export class CompanyRepresentantFormArrayComponent {
  form = this.fb.array([]);

  @Output() formReady = of(this.form);
  @ViewChild(CompanyRepresentantComponent)
  companyRepresentant: CompanyRepresentantComponent | undefined;

  constructor(private fb: FormBuilder) {
    setInterval(() => console.log(this.form), 3000);
  }

  // TODO: Dont know how typed this function
  addChildForm(group: any) {
    console.log(group)
    this.form.push(group);
  }

  addNewForm(): void {
    console.log('click')
    const form: any = this.companyRepresentant?.createNewPersonForm();
    this.form.push(form);
  }
}
