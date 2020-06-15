import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'CREATED':
                return 'Preparing';
            case 'OPEN':
                return 'Starting soon';
            case 'IN_PROGRESS':
                return 'In Progress';
            default:
                return 'unknown';
        }
    }
}
