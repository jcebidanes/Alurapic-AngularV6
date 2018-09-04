import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    signupForm: FormGroup;


    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router
    ) { }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30),
                    // Validators.pattern(/^[a-z0-9_\-]+$/)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', Validators.required]
        });
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signupService.signup(newUser).subscribe(
            () => this.router.navigate(['']),
            err => console.log(err)

        );
    }

}
