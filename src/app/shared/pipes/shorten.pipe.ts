import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: string, maxLength = 50) {
        if (value.length <= 50 ) {
            return value;
        }
        return value.substring(0, maxLength)+ '...'
    }
}