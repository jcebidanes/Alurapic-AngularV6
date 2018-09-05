import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    selector: 'ap-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {


    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;


    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router,
        private platformDetectionService: PlatformDetectorService
    ) { }

    ngOnInit() {

        if (this.platformDetectionService.isPlatformBrowser()) {
            this.emailInput.nativeElement.focus();
        }

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
            err => {
                if (this.platformDetectionService.isPlatformBrowser()) {
                    this.emailInput.nativeElement.focus();
                }
                console.log(err);
            }

        );
    }

}
