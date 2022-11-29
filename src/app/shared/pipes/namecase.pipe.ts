import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'namecase'
})
export class NamecasePipe implements PipeTransform {
    transform(value: {firstName: string, lastName: string}) {
        const newFirstName = value.firstName.toUpperCase();
        return newFirstName + ' ' + value.lastName;
    }
}