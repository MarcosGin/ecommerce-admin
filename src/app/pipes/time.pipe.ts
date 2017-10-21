import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args: string = 'time'): any {
    const date_now = 	new Date();
    const my_time = args === 'time' ? value / 1000 : new Date(value).getTime() / 1000;
    const time = Math.round(date_now.getTime() / 1000);
    const difference = time - my_time;
    let str;
    if (difference <= 60) {
      str = `Just now`;
    } else if (difference > 60 && difference <= 3600) {
      const minutes = Math.round((difference / 60));
      str = minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
    } else if (difference > 3600 && difference <= 86400) {
      const hours = Math.floor((difference / 60) / 60);
      str = hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
    } else if (difference > 86400) {
      const days = Math.floor(((difference / 60) / 60 ) *  0.041666);
      str = days > 1 ? `${days} days ago` : `${days} day ago`;
    }
    return str;

  }

}
