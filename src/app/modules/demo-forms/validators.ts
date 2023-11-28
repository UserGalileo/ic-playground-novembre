import {
  AbstractControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
  NG_VALIDATORS,
  AsyncValidatorFn, NG_ASYNC_VALIDATORS, AsyncValidator, FormGroup
} from "@angular/forms";
import {Directive, inject, Input} from "@angular/core";
import {delay, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

export function forbidden(value: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === value) return { forbidden: value };
    return null;
  }
}

@Directive({
  selector: '[forbidden]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenDirective,
      multi: true
    }
  ]
})
export class ForbiddenDirective implements Validator {
  @Input('forbidden') forbiddenValue: string | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.forbiddenValue == undefined) {
      return null;
    }
    return forbidden(this.forbiddenValue)(control);
  }
}

export function forbiddenAsync(value: string, http = inject(HttpClient)): AsyncValidatorFn {

  return (control: AbstractControl) => {
    if (control.value === value) return of({ forbidden: value }).pipe(delay(1000));
    return of(null).pipe(delay(1000));
  }
}

@Directive({
  selector: '[forbiddenAsync]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ForbiddenAsyncDirective,
      multi: true
    }
  ]
})
export class ForbiddenAsyncDirective implements AsyncValidator {
  @Input('forbiddenAsync') forbiddenValue: string | undefined;

  http = inject(HttpClient);

  validate(control: AbstractControl) {
    if (this.forbiddenValue == undefined) {
      return of(null);
    }
    return forbiddenAsync(this.forbiddenValue, this.http)(control);
  }
}

export function forbiddenPair(forbiddenFirstName: string, forbiddenLastName: string): ValidatorFn {
  return (control: AbstractControl) => {
    const firstName = (control as FormGroup).controls['firstName'].value;
    const lastName = (control as FormGroup).controls['lastName'].value;

    if (firstName === forbiddenFirstName && lastName === forbiddenLastName) {
      return {
        forbiddenPair: [firstName, lastName]
      }
    }
    return null;
  }
}
