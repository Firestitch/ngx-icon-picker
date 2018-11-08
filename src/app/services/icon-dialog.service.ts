import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../components';
import { Subject } from 'rxjs';


@Injectable()
export class IconDialog {

  constructor(private dialog: MatDialog) {}

  public open() {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      data: { }
    });

    const subject = new Subject();
    const afterClose = dialogRef.afterClosed().subscribe(result => {
      afterClose.unsubscribe();
      subject.next(result);
    });

    return subject;
  }
}
