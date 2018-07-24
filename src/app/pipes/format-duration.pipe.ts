import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {

  transform(duration: number): string {
    const hour = Math.floor(duration / 60);
    const min = duration % 60;
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
