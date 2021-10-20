import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';

import { Subject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'fs-component',
  templateUrl: 'dialog.component.html',
  styleUrls: [ 'dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  public data;
  public categories;
  public zoom = 1;
  public search: string;
  public searchChanged: Subject<string> = new Subject<string>();

  constructor(
    private _dialogRef: MatDialogRef<DialogComponent>,
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
    private _clipboardService: ClipboardService,
  ) {
    // Exclude 2 tone icons
    // https://github.com/google/material-design-icons/issues/190
    
    // this.data.forEach((category) => {
    //   category.icons = category.icons
    //     .filter((icon) => {
    //       return excludes.indexOf(icon.id) < 0;
    //     });
    //   });
  }

  select(event: KeyboardEvent, icon): void {
    if(event.ctrlKey || event.shiftKey) {
      this._clipboardService.copy(icon);
      this._message.success('Copied to Clipboard');
    } else {
      this._dialogRef.close(icon);
    }
  }

  ngOnInit() {
    const excludes = /^battery_|^signal_cellular|^signal_wifi/;

    fromFetch('/assets/fs-icons.json')
      .pipe(
        switchMap((response) => response.json()),
      )
      .subscribe((data) => {
        this.data = Object.values(
          Object.keys(data)
          .reduce((accum, item) => {
            const parts = item.split('::');
            const categoryId = parts[0];
            const icon = parts[1];

            if(!icon.match(excludes)) {
              let category = accum[categoryId];
              if(!category) {
                category = {
                  name: categoryId,
                  icons: [],
                };
                accum[categoryId] = category;
              }

              category.icons.push({
                id: icon,
              });
            }

            return accum;
          }, {})
        );
        this.categories = this.data;
        this._cdRef.markForCheck();
      });

    this._dialogRef.updateSize('5000px');
    this.searchChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((text) => {
        this.categories = [
          ...this.data,
        ];

        if (text.length) {
          text = text.toLocaleLowerCase();

          this.categories = this.categories
          .map((category) => {
            return {
              ...category,
              icons: category.icons.filter((icon) => {
                return icon.id.indexOf(text) !== -1;
              }),
            };
          })
          .filter((category) => {
            return category.icons.length;
          });
        }

        this._cdRef.markForCheck();
      });
  }
}
