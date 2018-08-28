import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { BreadCrumb } from './breadcrumbs.model';
import { EventService } from '../../services';
import * as fromRoot from '../../auth/store';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadCrumb[];
  isAuth$;
  private authSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public cd: ChangeDetectorRef,
              private eventService: EventService,
              private authStore: Store<fromRoot.State>) {
      this.cd.detach();
      this.isAuth$ = this.authStore.pipe(select(fromRoot.getLoggedIn));
  }

  ngOnInit() {
    const self = this;

    self.router.events.subscribe( event => {
      if (event.constructor.name === 'NavigationEnd') {
        self.breadcrumbs = self.buildBreadCrumb(self.activatedRoute.root);
        self.cd.detectChanges();
      }
    });

    self.eventService.on('refreshBreadcrumbs', function() {
      self.breadcrumbs = self.buildBreadCrumb(self.activatedRoute.root);
      self.cd.detectChanges();
    });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
                breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
      const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : '';
      const path = route.routeConfig && route.routeConfig.path ? route.routeConfig.path : '';

      const nextUrl = `${url}${path}/`;
      const breadcrumb = {
          label: label,
          url: nextUrl,
          isClickable: true
      };

      let newBreadcrumbs;
      if (label !== '') {
        newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
      } else {
        newBreadcrumbs = breadcrumbs;
      }
      if (route.firstChild) {
          return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
      }
      newBreadcrumbs[newBreadcrumbs.length - 1].isClickable = false;

      return newBreadcrumbs;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
