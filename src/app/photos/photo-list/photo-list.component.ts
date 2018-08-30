import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from '../photo';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PhotosService } from '../photos.service';

@Component({
    selector: 'ap-photo-list',
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

    public photos: Photo[] = [];
    public filter = '';
    public hasMore = true;
    public userName = '';
    public currentPage = 1;
    public debounce: Subject<string> = new Subject<string>();
    constructor(
        private activateRoute: ActivatedRoute,
        private photoService: PhotosService
    ) { }

    ngOnInit(): void {
        this.userName = this.activateRoute.snapshot.params.userName;
        this.photos = this.activateRoute.snapshot.data.photos;
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.filter = filter);

    }

    load() {
        this.photoService.listFromUserPaginated(this.userName, ++this.currentPage).subscribe(
            photos => {
                this.photos = this.photos.concat(photos);
                if (!photos.length) {
                    this.hasMore = false;
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}
