// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './http-auth-interceptor';
import { AuthGuard } from './auth-guard.service';
import { AdminGuard } from './admin-guard.service';
import { ClipboardService } from './clipboard.service';
import { SettingsService } from './settings.service';

@NgModule({
    providers: [
        SettingsService,
        AuthGuard,
        AdminGuard,
        ClipboardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initSettings,
            deps: [SettingsService],
            multi: true
        }
    ]
})
export class SvcModule { }

export function initSettings(settings: SettingsService) {
    return () => settings.load();
}
