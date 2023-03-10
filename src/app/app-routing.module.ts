// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthComponent } from './ui/unauth/unauth.component';
import { HomeComponent } from './ui/home/home.component';

const routes: Routes = [
  { path: 'unauth', component: UnauthComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
