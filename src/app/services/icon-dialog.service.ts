import { Injectable, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { DialogComponent } from '../components/dialog/dialog.component';
import { takeUntil } from 'rxjs/operators';


@Injectable()
export class IconDialog implements OnDestroy {
  private dialog = inject(MatDialog);


  private _destroy$ = new Subject();

  public open() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      data: { }
    });

    const subject = new Subject<any>();
    const afterClose = dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(result => {
      afterClose.unsubscribe();
      subject.next(result);
      subject.complete();
    });

    return subject;
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
