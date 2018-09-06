import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },

    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'

    },

    { path: 'user/:userName', component: PhotoListComponent, resolve: { photos: PhotoListResolver } },
    { path: 'p/add', component: PhotoFormComponent, canActivate: [AuthGuard] },
    { path: 'p/:photoId', component: PhotoDetailsComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
