import {Component, inject} from "@angular/core";
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form">
      <h4>Address</h4>

      <input formControlName="city" type="text">
      <input formControlName="street" type="text">
      <input formControlName="nr" type="text">
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressComponent,
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor {

  fb = inject(FormBuilder);

  form = this.fb.group({
    city: '',
    street: '',
    nr: ''
  });

  onChange = (val: any) => {}
  onTouched = () => {}

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    })
  }

  writeValue(obj: any) {
    this.form.setValue(obj);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable()
    } else {
      this.form.enable();
    }
  }
}
