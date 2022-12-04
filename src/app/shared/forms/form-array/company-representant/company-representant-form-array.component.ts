import { Component, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRepresentantComponent } from '../../form-groups/company-representant/company-representant.component';
import { distinctUntilChanged, map, ObservedValueOf, of } from 'rxjs';

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
  form = this.fb.array<RepresentantForm>([]);
  @ViewChild(CompanyRepresentantComponent, { static: true })
  companyRepresentant!: CompanyRepresentantComponent;

  @Output() formReady = of(this.form);
  groups: number[] = [];

  constructor(private fb: FormBuilder) {
    setInterval(() => console.log(this.form), 10000);

    this.form.valueChanges.pipe(distinctUntilChanged(), map((values) => values.map((_, idx) => idx))).subscribe((groups) => {
      this.groups = groups;
    })
  }

  addChildForm(group: any) {
    this.form.push(group);
  }

  addRepresentant(): void {
    this.groups.push(this.groups.length);
  }
}
