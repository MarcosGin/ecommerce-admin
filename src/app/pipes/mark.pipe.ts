import { Pipe, PipeTransform} from '@angular/core';

import { MarksService } from '../services/marks.service';
import { Mark } from '../interfaces/mark';
@Pipe({
  name: 'mark'
})

export class MarkPipe implements PipeTransform {

  private mark: Mark;
  constructor( private _marksService: MarksService ) {}

  transform(id: number): string {
    this.mark = this._marksService.getMark( id);
    return this.mark.name;
  }

}
