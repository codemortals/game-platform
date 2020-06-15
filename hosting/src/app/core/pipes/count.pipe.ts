import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'count' })
export class CountPipe implements PipeTransform {
    transform(value: any): number {
        return value instanceof Array ? value.length : 0;
    }
}
