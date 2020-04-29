// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { OnDestroy } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  subs: Array<Subscription> = [];
  errors: Array<Error> = [];
  progressBar = '';
  private pending: Subscription;
  private pbOn = '&#x2055';
  private pbOff = '&#x2022';
  private pbSuccess = '<span class="text text-success">&#x2713</span>';
  private pbFailure = '<span class="text text-warning">&#x2715</span>';
  private pbValues = [
    ' ****',
    '* ***',
    '** **',
    '*** *',
    '**** '
    // ' *********',
    // '* ********',
    // '** *******',
    // '*** ******',
    // '**** *****',
    // '***** ****',
    // '****** ***',
    // '******* **',
    // '******** *',
    // '********* '
  ];

  constructor() { }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      if (!s.closed) { s.unsubscribe(); }
    });
  }

  startProgress() {
    this.pending = interval(150).subscribe(i => {
      const t = this.pbValues.length;
      const j = Math.floor(i / t) % 2 ? t - i % t - 1 : i % t;

      this.progressBar = this.pbValues[j]
        .replace(/\*/g, this.pbOff)
        .replace(/ /, this.pbOn);
    });
    this.subs.push(this.pending);
  }

  endProgress(success: boolean) {
    if (this.pending.closed) {
      return;
    } else {
      this.pending.unsubscribe();
    }

    this.progressBar = success ? this.pbSuccess : this.pbFailure;
    this.subs.push(
      timer(5000).subscribe(() => this.progressBar = '')
    );
  }

  onError(err: Error) {
    this.errors.push(err);
    if (this.progressBar) {
      this.endProgress(false);
    }
  }
}
