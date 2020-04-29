// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import { Client, ClientSecret, ClientSummary, NewClient, SearchParams } from './models';

@Injectable()
export class GeneratedClientService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public list(search: SearchParams): Observable<Array<ClientSummary>> {
        return this.http.get<Array<ClientSummary>>(this.api.url + '/api/clients' + this.paramify(search));
    }
    public load(id: number): Observable<Client> {
        return this.http.get<Client>(this.api.url + '/api/client/' + id);
    }
    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.api.url + '/api/client/' + id);
    }
    public update(model: Client): Observable<Client> {
        return this.http.put<Client>(this.api.url + '/api/client', model);
    }
    public create(model: NewClient): Observable<ClientSummary> {
        return this.http.post<ClientSummary>(this.api.url + '/api/client', model);
    }
    public generateInvite(id: number): Observable<any> {
        return this.http.put<any>(this.api.url + '/api/client/' + id + '/code', {});
    }
    public generateSecret(id: number): Observable<ClientSecret> {
        return this.http.put<ClientSecret>(this.api.url + '/api/client/' + id + '/secret', {});
    }

}
