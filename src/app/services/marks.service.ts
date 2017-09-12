import { Injectable } from '@angular/core';
import { Mark } from '../interfaces/mark';

@Injectable()
export class MarksService {
  private marks: Mark [] = [
    {
      id: 1,
      name: 'Motorola'
    },
    {
      id: 2,
      name: 'Samsung'
    },
    {
      id: 3,
      name: 'Huawei'
    }
  ];
  constructor() {}

  getMarks() {
    return this.marks;
  }
  getMark( id: number) {
    return this.marks[ id - 1];
  }
}
