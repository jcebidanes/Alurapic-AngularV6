import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';

@Directive({ selector: '[apImmediateClickDirective]' })
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private platformDetectionService: PlatformDetectorService
    ) {

    }

    ngOnInit() {
        if (this.platformDetectionService.isPlatformBrowser()) {
            this.element.nativeElement.click();
        }
    }

}
