import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo/photo';
import { PhotoForm } from './photo-form/photo-form';
import { PhotoComment } from './photo/photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class PhotosService {

    constructor(private http: HttpClient) { }

    listFromUser(user: string) {
        return this.http.get<Photo[]>(`http://localhost:3000/${user}/photos`);
    }

    listFromUserPaginated(user: string, page: number) {
        const params = new HttpParams().append('page', page.toString());

        return this.http.get<Photo[]>(`http://localhost:3000/${user}/photos`, { params });
    }

    upload(photoForm: PhotoForm) {

        const formData = new FormData();
        formData.append('description', photoForm.description);
        formData.append('allowComments', photoForm.allowComments ? 'true' : 'false');
        formData.append('imageFile', photoForm.file);

        return this.http.post(API + '/photos/upload', formData);
    }

    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    addComments(photoId: number, commentText: string) {
        return this.http.post(API + '/photos/' + photoId + '/comments',
            { commentText }
        );
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {
        return this.http.post(
            API + '/photos/' + photoId + '/like', {}, { observe: 'response' }
        )
            .pipe(map(res => true))
            .pipe(catchError(err => {
                // tslint:disable-next-line:triple-equals
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}
