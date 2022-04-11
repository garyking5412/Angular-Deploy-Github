import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConverter',
})
export class DateConverterPipe implements PipeTransform {
  transform(json: any): Date {
    const j = JSON.stringify(json);
    const d = new Date(JSON.parse(j));
    return d;
  }
}
