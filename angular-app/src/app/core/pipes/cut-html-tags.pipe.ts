import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutHtmlTags',
})
export class CutHtmlTagsPipe implements PipeTransform {
  step;

  transform(value: string): string {
    this.step = value.replace(/<[^>]+>/gm, '');
    return this.step.replace(/&nbsp;/gm, '');
  }
}
