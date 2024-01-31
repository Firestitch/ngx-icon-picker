import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  forwardRef,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: '[fsIconPicker]',
  template: `
    <div class="mat-form-field-suffix fs-icon-wrap" *ngIf="model" (click)="openDialog()"><mat-icon [ngStyle]="{ color: color }">{{model}}</mat-icon></div>
    <fs-clear (clear)="clear()" [show]="true" [visible]="!!model"></fs-clear>
  `,
  styleUrls: ['./fs-icon-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FsIconPickerComponent),
    multi: true
  }],
})
export class FsIconPickerComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {

  @Input() public color = '';

  public model;

  constructor(
    private _dialog: MatDialog,
    private _el: ElementRef,
    private _cdRef: ChangeDetectorRef,
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

  public registerOnChange(_) { this.onChange = _; }
  public registerOnTouched(_) {}

  public onChange: any = () => {}
  public onTouch: any = () => {}

  private _destroy$ = new Subject();

  public ngAfterViewInit() {
    const element = this._el.nativeElement;
    element.setAttribute('readonly', 'readonly');
    element.parentElement.parentElement.insertBefore(element.firstChild, element.parentElement);
  }

  public clear() {
    this.change(null);
  }

  public openDialog() {

    const dialogRef = this._dialog.open(DialogComponent);

    dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
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
