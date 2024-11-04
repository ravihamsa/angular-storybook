import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BorneoIcon } from '../../types/iconType';

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

@Component({
  selector: 'app-sized-container',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="classes"
      class="right-1"
      [tabIndex]="isInteractive() ? -1 : null"
    >
      <span [class]="prefixIconClasses">
        <span [class]="prefixIcon()"> </span>
      </span>
      @if (label()) {
        <div class="flex justify-between items-center">
          {{ label() }}

          <span [class]="suffixIconClasses">
            <span [class]="suffixIcon()"> </span>
          </span>
        </div>
      }
    </div>
  `,
  styleUrl: './sized-container.component.css',
})
export class SizedContainerComponent {
  size = input(Size.medium);
  label = input('');
  prefixIcon = input<BorneoIcon | undefined>();
  suffixIcon = input<BorneoIcon | undefined>();
  isInteractive = input(false);
  disabled = input(false);
  isError = input(false);
  customClass = input('');

  public get prefixIconClasses() {
    const classes = [];
    const noIcons = !this.prefixIcon() && !this.suffixIcon();
    const onlyLeftIcon = this.prefixIcon() && !this.suffixIcon();
    const onlyRightIcon = !this.prefixIcon() && this.suffixIcon();
    const noLabel = !this.label();

    const iconRightSpacingMap = {
      [Size.medium]: 'pr-2.5',
      [Size.small]: 'pr-2',
      [Size.large]: 'pr-2.5',
    };

    const prefixIconPaddingMap = {
      [Size.medium]: 'p-3',
      [Size.small]: 'p-2',
      [Size.large]: 'p-4',
    };

    const prefixNoIconPaddingMap = {
      [Size.medium]: 'pl-3',
      [Size.small]: 'pl-2',
      [Size.large]: 'pl-4',
    };
    if (onlyLeftIcon && noLabel) {
      classes.push(prefixIconPaddingMap[this.size()]);
    } else if (noIcons || onlyRightIcon) {
      classes.push(prefixNoIconPaddingMap[this.size()]);
    } else if (this.prefixIcon()) {
      classes.push(prefixIconPaddingMap[this.size()]);
      classes.push(iconRightSpacingMap[this.size()]);
    }

    return classes.join(' ');
  }
  public get suffixIconClasses() {
    const classes = [];
    const noIcons = !this.prefixIcon() && !this.suffixIcon();
    const onlyLeftIcon = this.prefixIcon() && !this.suffixIcon();
    const noLabel = !this.label();

    const prefixNoIconPaddingMap = {
      [Size.medium]: 'pr-3',
      [Size.small]: 'pr-2',
      [Size.large]: 'pr-4',
    };
    const prefixIconPaddingMap = {
      [Size.medium]: 'p-3',
      [Size.small]: 'p-2',
      [Size.large]: 'p-4',
    };

    const iconLeftSpacingMap = {
      [Size.medium]: 'pl-2.5',
      [Size.small]: 'pl-2',
      [Size.large]: 'pl-2.5',
    };

    if (onlyLeftIcon && noLabel) {
      //add no classes
    } else if (noIcons || onlyLeftIcon) {
      classes.push(prefixNoIconPaddingMap[this.size()]);
    } else if (this.suffixIcon()) {
      classes.push(prefixIconPaddingMap[this.size()]);
      classes.push(iconLeftSpacingMap[this.size()]);
    }

    return classes.join(' ');
  }

  public get sizeClasses() {
    const classes = [];
    switch (this.size()) {
      case Size.medium:
        classes.push('ts-body-2 py-[10px] h-10');
        break;
      case Size.small:
        classes.push('ts-body-3 py-[6px] h-8');
        break;
      case Size.large:
        classes.push('ts-body-2 py-[13px] h-12');
        break;
      default:
        break;
    }
    return classes.join(' ');
  }

  public get baseClasses() {
    return [
      'inline-flex',
      'rounded-[6px]',
      'bg-background-neutral-screen',
      'items-center',
      'ring-1',
      'ring-border-default',
    ];
  }

  public get classes() {
    const classes = this.baseClasses;
    if (this.disabled()) {
      classes.push('cursor-not-allowed');
      classes.push('bg-background-neutral-300 text-content-secondary');
    } else if (this.isInteractive()) {
      classes.push(
        'cursor-pointer selection-none hover:ring-border-hover focus-within:ring-2 focus-within:ring-border-active',
      );
    }

    if (this.isError()) {
      if (this.disabled()) {
        classes.push('ring-technical-red-default');
      } else {
        classes.push(
          'ring-technical-red-default hover:ring-technical-red-transparent focus-within:ring-technical-red-default',
        );
      }
    }

    classes.push(this.sizeClasses);
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    return classes.join(' ');
  }
}
