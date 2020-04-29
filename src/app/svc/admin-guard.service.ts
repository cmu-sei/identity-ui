// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { SettingsService } from './settings.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  private role = 'member';

  constructor(
    private config: SettingsService
  ) {

  }

  canLoad(): boolean {
    return this.config.isPrivilegedUser();
  }

  canActivate(): boolean {
    return this.canLoad();
  }

  canActivateChild(): boolean {
    return this.canLoad();
  }

}
