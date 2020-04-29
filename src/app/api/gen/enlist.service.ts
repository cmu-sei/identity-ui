// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import {  } from './models';

@Injectable()
export class GeneratedEnlistService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public enlist(code: string): Observable<any> {
        return this.http.post<any>(this.api.url + '/api/' + code, {});
    }

}
