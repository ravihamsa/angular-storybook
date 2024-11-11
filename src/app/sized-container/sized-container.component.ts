import {
  AfterContentInit,
  Component,
  ContentChildren,
  input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { BorneoIcon } from '../../types/iconType';
import { twMerge } from 'tailwind-merge';
import { SizedTemplateDirective } from '../../directives/sized-template.directive';

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

@Component({
  selector: 'app-sized-container',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, NgIf],
  template: `
    <div [ngClass]="classes" [tabIndex]="isInteractive() ? -1 : null">
      <span [class]="prefixIconClasses">
        <span *ngIf="!prefixTemplate" [class]="prefixIcon()"> </span>
        <ng-container *ngTemplateOutlet="prefixTemplate"></ng-container>
      </span>
      <div class="flex justify-between w-full items-center">
        <span *ngIf="!contentTemplate">{{ label() }}</span>
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>

        <span [class]="suffixIconClasses">
          <span *ngIf="!suffixTemplate" [class]="suffixIcon()"> </span>
          <ng-container *ngTemplateOutlet="suffixTemplate"></ng-container>
        </span>
      </div>
    </div>
  `,
})
export class SizedContainerComponent implements AfterContentInit {
  size = input(Size.medium);
  label = input<string | undefined>('');
  prefixIcon = input<BorneoIcon | undefined>();
  suffixIcon = input<BorneoIcon | undefined>();
  isInteractive = input(false);
  disabled = input(false);
  isError = input(false);
  customClass = input('');
  fullWidth = input(true);
  @ContentChildren(SizedTemplateDirective)
  templates!: QueryList<SizedTemplateDirective>;
  public contentTemplate: TemplateRef<any> | null = null;
  public suffixTemplate: TemplateRef<any> | null = null;
  public prefixTemplate: TemplateRef<any> | null = null;

  public get prefixIconClasses() {
    const classes = [];
    const noPrefixContent = !this.prefixTemplate && !this.prefixIcon();
    const noSuffixContent = !this.suffixTemplate && !this.suffixIcon();

    const noIcons = noPrefixContent && noSuffixContent;
    const onlyLeftIcon = !noPrefixContent && noSuffixContent;
    const onlyRightIcon = !noSuffixContent && noPrefixContent;
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
    } else if (!noPrefixContent) {
      classes.push(prefixIconPaddingMap[this.size()]);
      classes.push(iconRightSpacingMap[this.size()]);
    }

    return classes.join(' ');
  }
  public get suffixIconClasses() {
    const classes = [];
    const noPrefixContent = !this.prefixTemplate && !this.prefixIcon();
    const noSuffixContent = !this.suffixTemplate && !this.suffixIcon();

    const noIcons = noPrefixContent && noSuffixContent;
    const onlyLeftIcon = !noPrefixContent && noSuffixContent;
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
    } else if (!noSuffixContent) {
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
      'flex',
      'rounded-md',
      'bg-background-neutral-screen',
      'items-center',
      'ring-1',
      'ring-border-default',
    ].join(' ');
  }

  public get classes() {
    let classes = this.baseClasses;
    if (!this.fullWidth()) {
      classes = twMerge(classes, 'inline-flex');
    }
    if (this.disabled()) {
      classes = twMerge(classes, 'cursor-not-allowed');
      classes = twMerge(
        classes,
        'bg-background-neutral-300 text-content-secondary',
      );
    } else if (this.isInteractive()) {
      classes = twMerge(
        classes,
        'cursor-pointer selection-none hover:ring-border-hover focus-within:ring-2 focus-within:ring-border-active',
      );
    }

    if (this.isError()) {
      if (this.disabled()) {
        classes = twMerge(classes, 'ring-technical-red-default');
      } else {
        classes = twMerge(
          classes,
          'ring-technical-red-default hover:ring-technical-red-transparent focus-within:ring-technical-red-default',
        );
      }
    }

    classes = twMerge(classes, this.sizeClasses);
    classes = twMerge(classes, this.customClass());
    return classes;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
        case 'suffix':
          this.suffixTemplate = item.template;
          break;
        case 'prefix':
          this.prefixTemplate = item.template;
          break;
      }
    });
  }
}
