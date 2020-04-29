// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';
import { AuthProfile } from '../api/gen/models';

@Injectable()
export class SettingsService {
  returnUrl = '';
  user: AuthProfile = {};
  authUrl = '/api/profile/auth';
  settingsUrl = 'assets/settings.json';
  settings: Settings = {
    applicationName: 'Foundry ID',
    authPath: '/api/profile/auth'
  };

  constructor(
    private http: HttpClient,
  ) {

  }

  public isPrivilegedUser() {
    return this.user.role && this.user.role !== 'member';
  }

  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const s1: Observable<Settings> = this.http.get<Settings>(this.settingsUrl)
        .pipe(catchError(err => { console.error('invalid settings!'); return of({}); }));

      const s2: Observable<Settings> = this.http.get(this.settingsUrl.replace(/json$/, 'env.json'))
        .pipe(catchError(err => of({})));

      forkJoin([s1, s2]).pipe(
        tap(([a, b]) => this.settings = { ...this.settings, ...a, ...b }),
        switchMap(([a, b]) => this.http.get<AuthProfile>(this.settings.apiUrl + this.settings.authPath).pipe(
          catchError(err => of({})),
          tap(p => this.user = p),
        ))
      ).subscribe(p => resolve(true));

    });
  }
}

export interface Settings {
  apiUrl?: string;
  authPath?: string;
  applicationName?: string;
  imageFolders?: Array<ImageFolder>;
}

export interface ImageFolder {
  folder?: string;
  field?: string;
  browseable?: boolean;
}
