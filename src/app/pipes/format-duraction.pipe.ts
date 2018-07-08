import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuraction'
})
export class FormatDuractionPipe implements PipeTransform {

  transform(duraction: number): string {
    const hour = Math.floor(duraction / 60);
    const min = duraction % 60;
    let result = '';
    if (hour >= 1)  {
      result += hour + 'h. ';
    }
    if (min > 0) {
      result += min + 'min.';
    }
    return result;
  }
}
