// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import { Account, SearchParams, UsernameRegistrationModel, UsernameRegistration } from './models';

@Injectable()
export class GeneratedAccountService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public list(search: SearchParams): Observable<Array<Account>> {
        return this.http.get<Array<Account>>(this.api.url + '/api/accounts' + this.paramify(search));
    }
    public load(id: number): Observable<Account> {
        return this.http.get<Account>(this.api.url + '/api/account/' + id);
    }
    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.api.url + '/api/account/' + id);
    }
    public update(model: Account): Observable<Account> {
        return this.http.put<Account>(this.api.url + '/api/account', model);
    }
    public import(model: UsernameRegistrationModel): Observable<UsernameRegistration[]> {
        return this.http.post<UsernameRegistration[]>(this.api.url + '/api/account', model);
    }
    public code(id: number): Observable<any> {
      return this.http.put<any>(this.api.url + '/api/account/' + id + '/code', {});
    }
    public unlock(id: number): Observable<any> {
      return this.http.put<any>(this.api.url + '/api/account/' + id + '/unlock', {});
    }
    public role(id: number, role: string): Observable<any> {
      return this.http.put<any>(this.api.url + '/api/account/' + id + '/role/' + role, {});
    }
    public state(id: number, val: string): Observable<any> {
      return this.http.put<any>(this.api.url + '/api/account/' + id + '/state/' + val, {});
    }

}
