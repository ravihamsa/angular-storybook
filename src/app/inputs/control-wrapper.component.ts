import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-control-wrapper',
  standalone: true,
  template: `
    <div class="flex-col flex gap-1">
      <label *ngIf="label()" class="text-lg font-bold">{{ label() }}</label>
      <ng-content></ng-content>
      <caption *ngIf="caption()" class="text-sm text-gray-500">
        {{
          caption()
        }}
      </caption>
    </div>
  `,
  imports: [NgIf],
})
export class ControlWrapperComponent {
  label = input<string>();
  caption = input<string>();
}
