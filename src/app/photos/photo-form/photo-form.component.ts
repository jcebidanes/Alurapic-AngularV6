import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { PhotoForm } from './photo-form';
import { PhotosService } from '../photos.service';
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
    percentDone = 0;

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

        this.photoService.upload(data)
            .pipe(finalize(() => {
                this.router.navigate(['/user', this.userService.getUserName()]);
            }))
            .subscribe(
                (event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.percentDone = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        this.alertService.success('Upload complete', true);
                    }
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Upload error!', true);
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
