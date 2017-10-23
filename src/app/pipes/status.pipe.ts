import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let str;
    switch (value) {
      case 1: {
        str = 'pending';
        break;
      }
      case 2: {
        str = 'fixing';
        break;
      }
      default: {
        str = 'fixed';
        break;
      }
    }
    return str;
  }

}
