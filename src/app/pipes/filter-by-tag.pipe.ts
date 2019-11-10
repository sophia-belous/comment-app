import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTag',
  pure: false
})
export class FilterByTagPipe implements PipeTransform {

  transform(list: string[], tag): any {
    return tag ? list.filter(item => item['tags'].indexOf(tag) !== -1) : list;
  }

}
