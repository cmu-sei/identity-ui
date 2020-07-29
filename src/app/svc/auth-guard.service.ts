// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from './settings.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private config: SettingsService,
        private router: Router,
        private locationStrat: LocationStrategy
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

          if (!!this.config.user?.id) {
            resolve(true);
            return;
          }

          if (state.url !== '/') {
            this.config.returnUrl = this.locationStrat.prepareExternalUrl(state.url);
          }

          this.router.navigate(['/unauth']);

          reject();
        });
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Promise<boolean> {

        return this.canActivate(route, state);
    }

}
