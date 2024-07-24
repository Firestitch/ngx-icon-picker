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

  @HostBinding('class.show')
  public get classShow() {
    return !!this.model;
  }

  @Input() public color = '';

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

  public registerOnChange(_) {
    this.onChange = _; 
  }

  public registerOnTouched(_) {
    //
  }

  public ngAfterViewInit() {
    const element = this._el.nativeElement;
    element.setAttribute('readonly', 'readonly');

    const open = element.querySelector('.open');
    element.parentElement.parentElement.insertBefore(open, element.parentElement);

    const copy = element.querySelector('.copy');
    element.parentElement.parentElement.insertBefore(copy, element.parentElement.nextSibling);
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
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _update(value) {
    this._el.nativeElement.value = value;
    this.model = value;
  }
}
