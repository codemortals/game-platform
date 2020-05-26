import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'CREATED':
                return 'Not ready';
            case 'OPEN':
                return 'Waiting for players';
            case 'IN_PROGRESS':
                return 'Started';
            case 'COMPLETED':
                return 'FINSHED';
            default:
                return 'unknown';
        }
    }
}
