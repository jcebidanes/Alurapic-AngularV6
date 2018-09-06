import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo/photo';
import { PhotoForm } from './photo-form/photo-form';

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
}
