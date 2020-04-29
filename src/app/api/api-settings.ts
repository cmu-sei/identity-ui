// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { SettingsService } from '../svc/settings.service';

@Injectable()
export class ApiSettings {

    constructor(
        settingsSvc: SettingsService
    ) {
        this.url = settingsSvc.settings.apiUrl;
    }

    url: string;
}
