// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from '../api-settings';
import { GeneratedService } from './_service';
import { AccountProfile, AlternateAccountProfile, TotpResult, TokenSummary, AccountMergeCode, ChangedPassword, Credentials } from './models';

@Injectable()
export class GeneratedProfileService extends GeneratedService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }

    public load(id: string): Observable<AccountProfile> {
        return this.http.get<AccountProfile>(this.api.url + '/api/profile/' + id);
    }
    public update(model: AccountProfile): Observable<any> {
        return this.http.put<any>(this.api.url + '/api/profile', model);
    }
    public getAltProfile(): Observable<AlternateAccountProfile> {
        return this.http.get<AlternateAccountProfile>(this.api.url + '/api/v4/user');
    }
    public getTotpKey(): Observable<string> {
        return this.http.get(this.api.url + '/api/profile/totp', { responseType: 'text'});
    }
    public testTotpKey(code: string): Observable<TotpResult> {
        return this.http.post<TotpResult>(this.api.url + '/api/profile/totp?id=&code=' + code, {});
    }
    public getTokenSummary(): Observable<TokenSummary> {
      return this.http.get<TokenSummary>(this.api.url + '/api/profile/tokens');
    }
    public getMergeCode(): Observable<AccountMergeCode> {
      return this.http.get<AccountMergeCode>(this.api.url + '/api/profile/merge');
    }
    public postMergeCode(code: string): Observable<AccountMergeCode> {
      return this.http.post<AccountMergeCode>(this.api.url + '/api/profile/merge', { code });
    }
    public postChangedPassword(model: ChangedPassword): Observable<any> {
      return this.http.post<any>(this.api.url + '/api/profile/password', model);
    }
    public sendCode(model: Credentials): Observable<any> {
      return this.http.post<any>(this.api.url + '/api/profile/code', model);
    }
    public addCredential(model: Credential): Observable<any> {
      return this.http.post<any>(this.api.url + '/api/profile/username', model);
    }
    public addCertificate(): Observable<any> {
      return this.http.post<any>(this.api.url + '/api/profile/cert', {});
    }
}
