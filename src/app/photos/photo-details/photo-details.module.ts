import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageComponent } from '../../shared/components/vmessage/vmessage.component';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { PhotoOwnerOnlyModule } from './photo-owner-only/photo-owner-only.module';
import { ShowIfLoggedModule } from '../../shared/diretives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        PhotoOwnerOnlyModule,
        ShowIfLoggedModule
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    providers: [],
})
export class PhotoDetailsModule { }
