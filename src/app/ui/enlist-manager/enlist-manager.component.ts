// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../base.component';
import { EnlistService } from 'src/app/api/enlist.service';

@Component({
  selector: 'app-enlist-manager',
  templateUrl: './enlist-manager.component.html',
  styleUrls: ['./enlist-manager.component.scss']
})
export class EnlistManagerComponent extends BaseComponent implements OnInit {

  constructor(
    route: ActivatedRoute,
    router: Router,
    enlistSvc: EnlistService
  ) {
    super();
    const url = route.snapshot.url.map(u => u.path).join('/');
    this.subs.push(
      enlistSvc.enlist(url).subscribe(
        () => router.navigate(['/' + url.split('/').reverse().pop()])
      )
    );
  }

  ngOnInit(): void {
  }

}
