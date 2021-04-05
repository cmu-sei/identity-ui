// Copyright 2020 Carnegie Mellon University.
// Released under a MIT (SEI) license. See LICENSE.md in the project root.

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { Client, ClientSecret } from 'src/app/api/gen/models';
import { ClientService } from 'src/app/api/client.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClipboardService } from 'src/app/svc/clipboard.service';
import { SettingsService } from 'src/app/svc/settings.service';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss']
})
export class ClientEditorComponent extends BaseComponent implements OnInit {
  @Input() id: number;
  @Output() deleted = new EventEmitter();
  @Output() updated = new EventEmitter<Client>();
  client: Client;
  form: FormGroup;
  invited = false;
  privileged = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientSvc: ClientService,
    private formBuilder: FormBuilder,
    private clipboardSvc: ClipboardService,
    private config: SettingsService
  ) {
    super();
  }

  ngOnInit(): void {

    const q = (this.id)
      ? of(this.id)
      : this.route.paramMap.pipe(
        map(p => +p.get('id'))
      );

    this.subs.push(
      q.pipe(
        switchMap(id => this.clientSvc.load(id))
      ).subscribe(client => {
        this.clientToForm(client);
        this.client = client;
      })
    );
  }

  clientToForm(client: Client) {

    this.form = this.formBuilder.group({

      id: [client.id],

      // general
      name: [client.name, Validators.required],
      displayName: [client.displayName],
      grants: [client.grants.split(' ').reverse().pop()],
      scopes: [client.scopes],
      enabled: [{value: client.enabled, disabled: !this.config.isPrivilegedUser()}],

      // grant specific
      requirePkce: [client.requirePkce],

      // tokens behavior
      alwaysIncludeUserClaimsInIdToken: [client.alwaysIncludeUserClaimsInIdToken],
      identityTokenLifetime: [client.identityTokenLifetime, Validators.pattern(/[0-9]+[smhd]/)],
      accessTokenLifetime: [client.accessTokenLifetime, Validators.pattern(/[0-9]+[smhd]/)],
      authorizationCodeLifetime: [client.authorizationCodeLifetime, Validators.pattern(/[0-9]+[smhd]/)],

      // consent behavior
      requireConsent: [client.requireConsent],
      consentLifetime: [client.consentLifetime, Validators.pattern(/[0-9]+[smhd]/)],

      // refresh behavior
      allowOfflineAccess: [client.allowOfflineAccess],
      updateAccessTokenClaimsOnRefresh: [client.updateAccessTokenClaimsOnRefresh],
      useOneTimeRefreshTokens: [client.useOneTimeRefreshTokens],
      absoluteRefreshTokenLifetime: [client.absoluteRefreshTokenLifetime, Validators.pattern(/[0-9]+[smhd]/)],
      slidingRefreshTokenLifetime: [client.slidingRefreshTokenLifetime, Validators.pattern(/[0-9]+[smhd]/)],

      // urls
      published: [client.published],
      url: [client.url],
      logoUrl: [client.logoUrl],
      backChannelLogoutUrl: [client.backChannelLogoutUrl],
      frontChannelLogoutUrl: [client.frontChannelLogoutUrl],
      redirectUrls: [ client.redirectUrls ],
      postLogoutUrls: [ client.postLogoutUrls ],
      corsUrls: [ client.corsUrls ],

      // claims
      alwaysSendClientClaims: [client.alwaysSendClientClaims],
      clientClaimsPrefix: [client.clientClaimsPrefix],
      claims: [ client.claims ],

      // secrets
      secrets: [ client.secrets ],
      managers: [client.managers ]
    });

    this.form.controls.grants.setValue(client.grants.split(' ').reverse().pop());
  }

  save() {

    this.subs.push(

      this.clientSvc.update(this.form.value).pipe(
        catchError(err => { throw err; })
      ).subscribe(
        (client) => {
          this.client = client;

          this.form.reset(client);
          this.form.controls.grants.setValue(
            client.grants.split(' ').reverse().pop()
          );

          this.updated.emit(this.client);
        },
        (err) => this.errors.push(err)
      )

    );

  }

  newSecret() {
    this.subs.push(
      this.clientSvc.generateSecret(this.client.id).subscribe(
        (secret: ClientSecret) => {
          this.form.controls.secrets.value.push(secret);
        }
      )
    );
  }

  newInvite() {
    this.subs.push(

      this.clientSvc.generateInvite(this.client.id).subscribe(
        (invite) => {
          const url = `${this.config.selfUrl()}client/enlist/${invite.code}`;
          this.clipboardSvc.copyToClipboard(url);
          this.invited = true;
          this.subs.push(
            timer(4000).subscribe(() => this.invited = false)
          );
        }
      )

    );
  }

  delete(confirmed: boolean) {

    if (!confirmed) { return; }

    this.subs.push(

      this.clientSvc.delete(this.client.id).subscribe(
        () => {
          this.deleted.emit();
          this.subs.push(
            timer(200).subscribe(() => this.router.navigate(['..']))
          );
        }
      )

    );
  }
}
