import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private activatetRoute: ActivatedRoute,
        private titleService: Title

    ) { }

    ngOnInit() {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(
                    () => this.activatetRoute
                ),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                switchMap(
                    route => route.data
                )
            )
            .subscribe(
                (event) => this.titleService.setTitle(event.title)
            );
    }

}
