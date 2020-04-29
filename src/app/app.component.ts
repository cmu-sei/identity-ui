// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component } from '@angular/core';
import { SettingsService } from './svc/settings.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'identity-ui';
  appName = 'Foundry ID';
  apiUrl = '';
  privileged = false;

  constructor(
    config: SettingsService,
    router: Router
  ) {
    this.appName = config.settings.applicationName;
    this.apiUrl = config.settings.apiUrl;

    timer(2000, 30000).subscribe(i =>
      this.privileged = config.isPrivilegedUser()
    );

    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {

      const mainHeader = document.querySelector('#main') as HTMLElement;
      if (mainHeader) {
        mainHeader.focus();
      }
    });
  }
}
