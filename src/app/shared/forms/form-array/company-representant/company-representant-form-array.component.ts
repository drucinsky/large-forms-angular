import { Component, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRepresentantComponent } from '../../form-groups/company-representant/company-representant.component';
import { ObservedValueOf, of } from 'rxjs';

interface RepresentantForm {
  representative: ObservedValueOf<CompanyRepresentantComponent["formReady"]>;
}

@Component({
  selector: 'app-company-representant-form-array',
  standalone: true,
  imports: [CommonModule, CompanyRepresentantComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './company-representant-form-array.component.html',
})
export class CompanyRepresentantFormArrayComponent {
  form = this.fb.group({
    representatives: this.fb.array([])
  });

  @Output() formReady = of(this.form);
  @ViewChild(CompanyRepresentantComponent, { static: true })
  companyRepresentant!: CompanyRepresentantComponent;

  constructor(private fb: FormBuilder) {
    setInterval(() => console.log(this.form), 10000);
  }

  get representatives(): FormArray {
    return this.form.controls.representatives;
  }

  // TODO: Dont know how typed this function
  addChildForm(group: any) {
    console.log(group)
    this.representatives.push(group);
  }

  addRepresentant(): void {
    console.log(this.companyRepresentant);
    const form: FormGroup | undefined = this.companyRepresentant.createNewPersonForm();
    console.log(form);
    console.log(this.representatives);
    this.representatives.push(form);
  }

  removeRepresentant(representantIndex: number) {
    this.representatives.removeAt(representantIndex);
  }
}
