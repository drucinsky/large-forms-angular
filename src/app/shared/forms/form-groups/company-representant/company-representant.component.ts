import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RepresentantRole } from 'src/app/shared/enums/representant-role';
import { defer, map, of, startWith } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';

interface RepresentantForm {
  name: string;
  surname: string;
  role: RepresentantRole;
}

@Component({
  selector: 'app-company-representant',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule],
  templateUrl: './company-representant.component.html'
})
export class CompanyRepresentantComponent {
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    surname: ['', [Validators.required, Validators.maxLength(150)]],
    role: ['', [Validators.required]],
  });
  @Output() formReady = of(this.form);
  @Output()
  valueChange = defer(() =>
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      map(
        (formValue): Partial<RepresentantForm> => ({
          name: formValue.name,
          surname: formValue.surname,
          role: formValue.role as RepresentantRole,
        })
      )
    )
  );
  @Input() set initialCompanyData(representant: RepresentantForm) {
    this.form.patchValue({
      name: representant.name,
      surname: representant.surname,
      role: representant.role,
    });
  }
  representantRole: RepresentantRole[] = Object.values(RepresentantRole);

  constructor(private fb: FormBuilder) { }

  createNewPersonForm(): FormGroup {
    return this.form;
  }
}
