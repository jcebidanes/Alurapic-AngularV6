import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../photos.service';

@Component({
    selector: 'ap-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    public photos: Photo[] = [];
    public filter = '';
    public hasMore = true;
    public userName = '';
    public currentPage = 1;

    constructor(
        private activateRoute: ActivatedRoute,
        private photoService: PhotosService
    ) { }

    ngOnInit(): void {

        this.activateRoute.params.subscribe(params => {
            this.userName = params.userName;
            this.photos = this.activateRoute.snapshot.data.photos;
        });
    }

    load() {
        this.photoService.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(
            photos => {
                this.filter = '';
                this.photos = this.photos.concat(photos);
                if (!photos.length) {
                    this.hasMore = false;
                }
            }
        );
    }
}
