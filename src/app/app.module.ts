// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/gen/api.module';
import { SvcModule } from './svc/svc.module';
import { UiModule } from './ui/ui.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    SvcModule,
    UiModule,
    AppRoutingModule,
    QRCodeModule
  ],
  providers: [ QRCodeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
