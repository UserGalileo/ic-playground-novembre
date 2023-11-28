import {Component} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button [disabled]="isDisabled" type="button" (click)="inc()">+</button>
    <button [disabled]="isDisabled" type="button" (click)="dec()">-</button>
    {{ count }}
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CounterComponent,
      multi: true
    }
  ]
})
export class CounterComponent implements ControlValueAccessor {
  count = 0;
  isDisabled = false;
  onChange = (val: number) => {}
  onTouched = () => {}

  inc() {
    this.count++;
    this.onChange(this.count);
    this.onTouched();
  }

  dec() {
    this.count--;
    this.onChange(this.count);
    this.onTouched();
  }

  // Da modello -> a componente
  writeValue(value: number) {
    this.count = value;
  }

  // Da componente -> a modello
  registerOnChange(fn: any) {
    // Bisognerà chiamare la funzione onChange() ogni volta
    // che il valore interno cambia.
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // Da modello -> a componente
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
