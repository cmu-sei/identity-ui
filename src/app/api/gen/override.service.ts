// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import { NewOverrideCode, OverrideCode } from './models';

@Injectable()
export class GeneratedOverrideService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public list(): Observable<Array<OverrideCode>> {
        return this.http.get<Array<OverrideCode>>(this.api.url + '/api/codes');
    }
    public create(model: NewOverrideCode): Observable<OverrideCode> {
        return this.http.post<OverrideCode>(this.api.url + '/api/code', model);
    }
    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.api.url + '/api/code/' + id);
    }

}
