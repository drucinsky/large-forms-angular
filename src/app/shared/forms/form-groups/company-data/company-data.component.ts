import { Component, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, map, of, startWith } from 'rxjs';
import { nipValidator } from '../../validators/nip/nip-validator';
import { regonValidator } from '../../validators/regon/regon-validator';
import { CompanyType } from 'src/app/shared/enums/company-type';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

interface CompanyData {
  name: string;
  companyType: CompanyType;
  regon: string;
  nip: string;
}

@Component({
  selector: 'app-company-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule],
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent {
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    companyType: ['', Validators.required],
    regon: ['', [Validators.required, regonValidator]],
    nip: ['', [Validators.required, nipValidator]]
  });

  @Output() formReady = of(this.form);
  @Output()
  valueChange = defer(() =>
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      map(
        (formValue): Partial<CompanyData> => ({
          name: formValue.name,
          companyType: formValue.companyType as CompanyType,
          regon: formValue.regon,
          nip: formValue.nip
        })
      )
    )
  );
  @Input() set initialCompanyData(companyData: CompanyData) {
    this.form.patchValue({
      name: companyData.name,
      companyType: companyData.companyType,
      regon: companyData.regon,
      nip: companyData.nip
    });
  }
  companyTypes: CompanyType[] = Object.values(CompanyType);

  constructor(private fb: FormBuilder) { }
}
