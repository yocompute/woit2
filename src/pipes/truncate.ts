import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'truncate',
})

@Injectable()
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args: string[]) : string {
  	let len = 80;
    let limit = args.length > 0 ? parseInt(args[0], len) : len;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
