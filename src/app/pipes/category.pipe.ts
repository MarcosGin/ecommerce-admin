import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'category'
})

export class CategoryPipe implements PipeTransform {

  private iconsCategory = ['fa-mobile', 'fa-tv', 'fa-laptop' , 'fa-tablet' , 'fa-desktop'];

  transform(value: number): string {
    if (value === 1) {
        return this.iconsCategory[0];
    } else if (value === 2) {
        return this.iconsCategory[1];
    } else {
        return this.iconsCategory[2];
    }
  }

}
