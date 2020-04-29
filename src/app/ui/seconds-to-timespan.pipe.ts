// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTimespan'
})
export class SecondsToTimespanPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const d = value / 86400;
    const h = value / 3600;
    const m = value / 60;

    return d >= 1 ? `${d}d`
      : h >= 1 ? `${h}h`
      : m >= 1 ? `${m}m`
      : `${value}s`;
  }

}
