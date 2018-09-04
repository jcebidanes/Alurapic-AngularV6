import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(c: AbstractControl) {

    if (c.value.trim() && !/^[a-z0-9_\-]+$/.test(c.value)) {
        return { lowerCase: true };
    }

    return null;
}
