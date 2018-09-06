import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoOwnerOnlyDirective } from './photo-owner-only.directive';

@NgModule({
    declarations: [PhotoOwnerOnlyDirective],
    imports: [CommonModule],
    exports: [PhotoOwnerOnlyDirective],
    providers: [],
})
export class PhotoOwnerOnlyModule { }
