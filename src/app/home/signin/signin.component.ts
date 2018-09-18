import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
    selector: 'ap-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    fromUrl: string;

    loginForm: FormGroup;
    @ViewChild('userNameInput')
    userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formeBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectionService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            params => (this.fromUrl = params['fromUrl'])
        );

        this.loginForm = this.formeBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        if (this.platformDetectionService.isPlatformBrowser()) {
            this.userNameInput.nativeElement.focus();
        }
    }

    /**
     * login
     */
    public login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService.authenticate(userName, password).subscribe(
            () => {
                if (this.fromUrl) {
                    this.router.navigateByUrl(this.fromUrl);
                } else {
                    this.router.navigate(['user', userName]);
                }
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
