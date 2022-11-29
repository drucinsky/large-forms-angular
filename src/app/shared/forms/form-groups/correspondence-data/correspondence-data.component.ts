import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { defer, map, of, startWith } from 'rxjs';

interface AddressForm {
  street: string;
  streetNo: string;
  localNo: string;
  postalCode: string;
  city: string;
  countryId: number | undefined;
  phone: string;
  email: string
}

@Component({
  selector: 'app-correspondence-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule],
  templateUrl: './correspondence-data.component.html',
  styleUrls: ['./correspondence-data.component.scss']
})
export class CorrespondenceDataComponent {
  form = this.fb.nonNullable.group({
    street: ['', [Validators.required, Validators.maxLength(50)]],
    streetNo: ['', [Validators.required, Validators.maxLength(7)]],
    localNo: ['', Validators.maxLength(5)],
    postalCode: ['', Validators.required],
    city: ['', [Validators.required, Validators.maxLength(40)]],
    countryId: new FormControl<number | undefined>(undefined, { validators: Validators.required, nonNullable: true }),
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  @Output() formReady = of(this.form);
  @Output()
  valueChange = defer(() =>
    this.form.valueChanges.pipe(
      startWith(this.form.value),
      map(
        (formValue): Partial<AddressForm> => ({
          street: formValue.street,
          streetNo: formValue.streetNo,
          localNo: formValue.localNo,
          postalCode: formValue.postalCode,
          city: formValue.city,
          countryId: formValue.countryId,
          phone: formValue.phone,
          email: formValue.email
        })
      )
    )
  );

  @Input() set initialCorrespondenceAddress(address: AddressForm) {
    this.form.patchValue({
      street: address.street,
      streetNo: address.streetNo,
      localNo: address.localNo,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.countryId,
      phone: address.phone,
      email: address.email
    });
  }
  @Input() title: string = 'Adres siedziby';
  @Input() classList: string[] = [''];

  constructor(private fb: FormBuilder) { }
}
