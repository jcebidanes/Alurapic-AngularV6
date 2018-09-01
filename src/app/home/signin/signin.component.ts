import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    selector: 'ap-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formeBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectionService: PlatformDetectorService
    ) { }

    ngOnInit() {
        this.loginForm = this.formeBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * login
     */
    public login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService.authenticate(userName, password)
            .subscribe(
                () => {
                    this.router.navigate(['user', userName]);
                },
                err => {
                    this.loginForm.reset();
                    if (this.platformDetectionService.isPlatformBrowser()) {
                        this.userNameInput.nativeElement.focus();
                    }
                    alert('Invalid user nanme or password');
                }
            );
    }

}
