import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sizedTemplate]',
  standalone: true,
  host: {},
})
export class SizedTemplate {
  @Input() type: string | undefined;

  @Input('sizedTemplate') name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }
}
