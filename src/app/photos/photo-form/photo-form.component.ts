import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoForm } from './photo-form';
import { PhotosService } from '../photos.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
    selector: 'ap-photo-form',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: string;

    constructor(
        private formBuilder: FormBuilder,
        private photoService: PhotosService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit() {

        this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true]
        });
    }

    upload() {
        const data = this.photoForm.getRawValue() as PhotoForm;
        data.file = this.file;

        this.photoService.upload(data).subscribe(
            () => {
                this.alertService.success('Upload complete', true);
                this.router.navigate(['/user', this.userService.getUserName()]);
            },
            err => {
                console.log('Error: ' + err);
            }
        );
    }

    handleFile(file: File) {
        this.file = file;
        const reader = new FileReader();

        reader.onload = (event: any) => this.preview = event.target.result;
        reader.readAsDataURL(file);
    }

}
