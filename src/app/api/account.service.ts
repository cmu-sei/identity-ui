// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSettings } from './api-settings';
import { GeneratedAccountService } from './gen/account.service';
import { Account, SearchParams } from './gen/models';

@Injectable()
export class AccountService extends GeneratedAccountService {

    constructor(
       protected http: HttpClient,
       protected api: ApiSettings
    ) { super(http, api); }
}
