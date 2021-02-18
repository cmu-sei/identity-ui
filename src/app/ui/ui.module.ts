// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/svc/auth-guard.service';
import { ImageModule } from './image/image.module';
import { QRCodeModule } from 'angularx-qrcode';
import { TotpComponent } from './totp/totp.component';
import { ClientEditorComponent } from './client-editor/client-editor.component';
import { ResourceNavComponent } from './resource-nav/resource-nav.component';
import { ApiEditorComponent } from './api-editor/api-editor.component';
import { ApiBrowserComponent } from './api-browser/api-browser.component';
import { ClientBrowserComponent } from './client-browser/client-browser.component';
import { AccountBrowserComponent } from './account-browser/account-browser.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';
import { ListPagerComponent } from './list-pager/list-pager.component';
import { CollapsePanelComponent } from './collapse-panel/collapse-panel.component';
import { InputTimespanComponent } from './input-timespan/input-timespan.component';
import { InputCheckboxComponent } from './input-checkbox/input-checkbox.component';
import { InputListComponent } from './input-list/input-list.component';
import { InputTextComponent } from './input-text/input-text.component';
import { EnlistManagerComponent } from './enlist-manager/enlist-manager.component';
import { ConfirmButtonComponent } from './confirm-button/confirm-button.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { AccountImportComponent } from './account-import/account-import.component';
import { OverrideCodeComponent } from './override-code/override-code.component';
import { SpacesPipe } from './spaces.pipe';
import { AdminGuard } from '../svc/admin-guard.service';
import { ErrorListComponent } from './error-list/error-list.component';
import { ProfileCredsComponent } from './profile-creds/profile-creds.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileEmailComponent } from './profile-email/profile-email.component';
import { ProfileMergeComponent } from './profile-merge/profile-merge.component';
import { UnauthComponent } from './unauth/unauth.component';
import { HomeComponent } from './home/home.component';
import { AccountMailerComponent } from './account-mailer/account-mailer.component';
import { InputKeyValueComponent } from './input-keyvalue/input-keyvalue.component';
@NgModule({
  declarations: [ProfileComponent, TotpComponent, ClientEditorComponent, ResourceNavComponent,
    ApiEditorComponent, ApiBrowserComponent, ClientBrowserComponent, AccountBrowserComponent, AccountEditorComponent,
    ListPagerComponent, CollapsePanelComponent, InputTimespanComponent, InputCheckboxComponent, InputListComponent,
    InputTextComponent, EnlistManagerComponent, ConfirmButtonComponent, BackButtonComponent, AccountImportComponent,
    OverrideCodeComponent, SpacesPipe, ErrorListComponent,
    ProfileCredsComponent, ProfileEditComponent, ProfilePasswordComponent, ProfileEmailComponent, ProfileMergeComponent,
    UnauthComponent, HomeComponent, AccountMailerComponent, InputKeyValueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    QRCodeModule,
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'manage', redirectTo: 'resource' },
      { path: 'client', component: ClientBrowserComponent, canActivate: [AuthGuard] },
      { path: 'client/:id', component: ClientEditorComponent, canActivate: [AuthGuard] },
      { path: 'client/enlist/:code', component: EnlistManagerComponent, canActivate: [AuthGuard] },
      { path: 'resource', component: ApiBrowserComponent, canActivate: [AuthGuard] },
      { path: 'resource/:id', component: ApiEditorComponent, canActivate: [AuthGuard] },
      { path: 'resource/enlist/:code', component: EnlistManagerComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountBrowserComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'account/:id', component: AccountEditorComponent, canActivate: [AuthGuard, AdminGuard] },
    ])
  ],
  providers: [
  ]
})
export class UiModule {
}
