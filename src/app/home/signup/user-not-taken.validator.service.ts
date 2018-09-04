import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';
import { SignupService } from './signup.service';

@Injectable({
    providedIn: 'root'
})
export class UserNotTakenValidatorService {

    constructor(private signupService: SignupService) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges
                .pipe(
                    debounceTime(300),
                    switchMap(userName => {
                        return this.signupService.checkUserNameTaken(userName);
                    }),
                    map(isTaken => isTaken ? { userNameTaken: true } : null),
                    first()
                );
        };

    }
}
