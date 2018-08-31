import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photo } from './photo/photo';

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
}
