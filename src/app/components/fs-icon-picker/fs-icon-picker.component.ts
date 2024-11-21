import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatInput } from '@angular/material/input';

import { FsClipboard } from '@firestitch/clipboard';

import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

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
    private _injector: Injector,
  ) { }

  public writeValue(value) {
    this._update(value);
  }

  public registerOnChange(onChange) {
    this.onChange = onChange; 
  }

  public registerOnTouched() {
    //
  }

  public setDisabledState?(): void {
    //
  }

  public ngAfterViewInit() {
    this._el.nativeElement.setAttribute('disabled', 'disabled');
    const formField = this._injector.get(MatFormField).getConnectedOverlayOrigin();
    formField.nativeElement.classList.add('fs-icon-picker-form-field');
    
    fromEvent(formField.nativeElement, 'click')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.openDialog();
      });

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
        filter((value: string | null) => !!value),
        takeUntil(this._destroy$),
      )
      .subscribe((value: string | null) => {
        this.change(value);
        this._cdRef.markForCheck();
      });
  }

  public change(value) {
    this._update(value);
    this.onChange(value);
    this._injector.get(MatInput).value = value;
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
