import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotosService } from '../photos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ap-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    public photos: Photo[] = [];

    constructor(
        private photoService: PhotosService,
        private activateRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const userName = this.activateRoute.snapshot.params.userName;
        this.photoService.listFromUser(userName).subscribe(
            photos => this.photos = photos
        );
    }

}
