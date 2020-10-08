import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wish',
  pure: false
})


export class WishPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const time = new Date().getHours();
    if (time === 5 || time <= 11){
      return 'Good Morning ' + value;
    }
    if (time === 12 || time <= 16){
      return 'Good Afternoon ' + value;
    }
    if (time === 17 || time <= 19)
    {
      return 'Good Evening ' + value;
    }
    return value;
  }

}
