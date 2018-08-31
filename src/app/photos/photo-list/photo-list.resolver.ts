import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { PhotosService } from '../photos.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private service: PhotosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const userName = route.params.userName;
        return this.service.listFromUserPaginated(userName, 1);
    }
}
