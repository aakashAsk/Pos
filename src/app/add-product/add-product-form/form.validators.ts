import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isNumber(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (!isNaN(+control.value)){
      return {isAn: true};
    }
    return null;
  };
}
