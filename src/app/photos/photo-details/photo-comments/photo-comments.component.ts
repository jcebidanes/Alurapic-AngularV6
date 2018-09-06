import { Component, OnInit, Input } from '@angular/core';
import { PhotosService } from '../../photos.service';
import { Observable } from 'rxjs';
import { PhotoComment } from '../../photo/photo-comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    commentForm: FormGroup;

    comments$: Observable<PhotoComment[]>;


    constructor(
        private photoService: PhotosService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });

    }

    save() {
        const commentText = this.commentForm.get('comment').value as string;

        this.comments$ = this.photoService.addComments(this.photoId, commentText)
            .pipe(
                switchMap(() => this.photoService.getComments(this.photoId)),
                tap(() => {
                    this.commentForm.reset();
                })
            );
    }

}
