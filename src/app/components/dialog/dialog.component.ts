import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsClipboard } from '@firestitch/clipboard';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { fromFetch } from 'rxjs/fetch';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'fs-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        MatPrefix,
        MatIcon,
        MatInput,
        FormsModule,
        FsSkeletonModule,
        MatTooltip,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class DialogComponent implements OnInit {
  private _dialogRef = inject<MatDialogRef<DialogComponent>>(MatDialogRef);
  private _cdRef = inject(ChangeDetectorRef);
  private _clipboard = inject(FsClipboard);

  
  public data;
  public _categories: string[];
  public _icons: Icon[];
  public categoryIcons: { icons: Icon[], category: string }[];
  public zoom = 1;
  public search: string;
  private _searchChanged: Subject<string> = new Subject<string>();

  public select(event: MouseEvent, icon): void {
    if(event.ctrlKey || event.shiftKey) {
      this._clipboard.copy(icon);
    } else {
      this._dialogRef.close(icon);
    }
  }
  
  public searchChange(keyword) {
    this._searchChanged.next(keyword);
  }

  public ngOnInit() {
    fromFetch('/assets/icon-picker/icons.json')
      .pipe(
        switchMap((response) => response.json()),
      )
      .subscribe((data) => {
        this._icons = data.icons
          .filter((icon) => {
            return icon.unsupported_families.indexOf('Material Icons') === -1;
          });

        const categories = this._icons.
          reduce((accum, icon) => {
            return {
              ...accum,
              ...icon.categories
                .reduce((categoryAccum, category) => {
                  return {
                    ...categoryAccum,
                    [category]: true,
                  };
                }, {}),
            };
          }, {});

        this._categories = Object.keys(categories);
        this.loadIcons();
      });

    this._dialogRef.updateSize('5000px');
    this._searchChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((keyword) => {
        this.loadIcons(keyword);
      });
  }

  public loadIcons(keyword?: string): void {
    this.categoryIcons = [];
    const categoryIcons = this._icons
      .filter((icon: Icon) => !keyword || icon.tags
        .some((tag) => (tag.indexOf(keyword) !== -1)),
      )
      .reduce((accum, icon) => {
        return {
          ...accum,
          ...icon.categories
            .reduce((accum1, category) => {
              const items = accum[category] || [];

              return {
                ...accum1,
                [category]: [
                  ...items,
                  icon,
                ],
              };
            }, {}),
        };
      }, {});

    this.categoryIcons = Object.keys(categoryIcons)
      .filter((category) => !!categoryIcons[category])
      .map((category) => {
        return {
          category,
          icons: categoryIcons[category],
        };
      }, []);

    this._cdRef.markForCheck();
  }
}

interface Icon {
  name: string;
  categories: string[],
  tags: string[]
}

