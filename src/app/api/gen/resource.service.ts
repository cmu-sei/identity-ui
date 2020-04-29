// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import { ChangedResource, NewResource, Resource, SearchParams } from './models';

@Injectable()
export class GeneratedResourceService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public list(search: SearchParams): Observable<Array<Resource>> {
        return this.http.get<Array<Resource>>(this.api.url + '/api/resources' + this.paramify(search));
    }
    public load(id: number): Observable<Resource> {
        return this.http.get<Resource>(this.api.url + '/api/resource/' + id);
    }
    public update(model: ChangedResource): Observable<Resource> {
        return this.http.put<Resource>(this.api.url + '/api/resource', model);
    }
    public create(model: NewResource): Observable<Resource> {
        return this.http.post<Resource>(this.api.url + '/api/resource', model);
    }
    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.api.url + '/api/resource/' + id);
    }
    public generateInvite(id: number): Observable<any> {
      return this.http.put<any>(this.api.url + '/api/resource/' + id + '/code', {});
    }
}
