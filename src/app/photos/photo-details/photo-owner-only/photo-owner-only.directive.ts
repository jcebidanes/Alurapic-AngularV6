import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { UserService } from '../../../core/user/user.service';

@Directive({ selector: '[apPhotoOwnerOnly]' })
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownerPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUser().subscribe(
            user => {
                if (!user || user.id != this.ownerPhoto.userId) {
                    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
                }
            }
        );
    }
}
