// Copyright 2020 Carnegie Mellon University. 
// Released under a MIT (SEI) license. See LICENSE.md in the project root. 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespanToSeconds'
})
export class TimespanToSecondsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    const v = value.match(/^([0-9]+)([smhd])/);
    const tag = v.pop();
    const num = +v.pop();
    let i = 1;

    switch (tag) {
      case 'd':
        i = 86400;
        break;
      case 'h':
        i = 3600;
        break;
      case 'm':
        i = 60;
        break;
      default:
        i = 1;
    }
    return num * i;
  }

}
