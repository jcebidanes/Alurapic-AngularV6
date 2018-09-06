import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../photos.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';

@Component({
    selector: 'ap-photo-details',
    templateUrl: './photo-details.component.html',
    styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotosService
    ) { }

    ngOnInit() {

        const id = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(id);
    }

}
