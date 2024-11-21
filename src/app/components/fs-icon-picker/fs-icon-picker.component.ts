import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { FsClipboard } from '@firestitch/clipboard';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: '[fsIconPicker]',
  templateUrl: './fs-icon-picker.component.html',
  styleUrls: ['./fs-icon-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsIconPickerComponent),
    multi: true,
  }],
})
export class FsIconPickerComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {

  @ViewChild('openEl', { read: ElementRef })
  public openEl: ElementRef;

  @ViewChild('copyEl', { read: ElementRef })
  public copyEl: ElementRef;

  @HostBinding('class.has-value')
  public get classShow() {
    return !!this.model;
  }

  @Input() public color = '';
  @Input() public showCopy = false;

  public model;

  public onChange: (value) => void;
  public onTouch: () => void;

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _el: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _clipboard: FsClipboard,
  ) { }

  @HostListener('click', ['$event'])
  public inputClick($event: Event) {
    if (!this.model) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.openDialog();
  }

  public writeValue(value) {
    this._update(value);
    this._cdRef.markForCheck();
  }

  public registerOnChange(onChange) {
    this.onChange = onChange; 
  }

  public registerOnTouched() {
    //
  }

  public ngAfterViewInit() {
    this._el.nativeElement.setAttribute('readonly', 'readonly');
    const el = this._getFormFieldFlex(this._el.nativeElement);

    const prefix = document.createElement('div');
    prefix.classList.add('mat-mdc-form-field-icon-prefix');
    prefix.appendChild(this.openEl.nativeElement);
    el.prepend(prefix);

    const suffix = document.createElement('div');
    suffix.classList.add('mat-mdc-form-field-icon-suffix');
    suffix.appendChild(this.copyEl.nativeElement);

    el.insertBefore(suffix, el.querySelector('.mat-mdc-form-field-infix').nextSibling);
  }

  public clear() {
    this.change(null);
  }

  public copy(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this._clipboard.copy(this.model);
  }

  public openDialog() {
    this._dialog.open(DialogComponent, {
      height: '90%',
      width: '90%',
      maxHeight: '90%',
      maxWidth: '90%',
    })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value: string | null) => {
        if (value) {
          this.change(value);
        }
      });
  }

  public change(value) {
    this._update(value);
    this.onChange(value);
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _update(value) {
    this.model = value;
  }

  private _getFormFieldFlex(el: Element) {
    if (el.classList.contains('mat-mdc-form-field-flex')) {
      return el;
    }

    return el.parentElement ? this._getFormFieldFlex(el.parentElement) : null;
  }

}
