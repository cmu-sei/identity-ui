// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { ClientService } from '../client.service';
import { OverrideService } from '../override.service';
import { ProfileService } from '../profile.service';
import { ResourceService } from '../resource.service';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiSettings } from '../api-settings';
import { EnlistService } from '../enlist.service';
import { AccountService } from '../account.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [
        ApiSettings,
        ClientService,
        OverrideService,
        ProfileService,
        ResourceService,
        EnlistService,
        AccountService
    ]
})
export class ApiModule { }
