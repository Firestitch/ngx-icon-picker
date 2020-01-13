import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICON_DATA } from '../../assets/data';
import { MatDialogRef } from '@angular/material/dialog';
import { clone } from 'lodash-es';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'fs-component',
  templateUrl: 'dialog.component.html',
  styleUrls: [ 'dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  public data = ICON_DATA.categories;
  public categories = ICON_DATA.categories;
  public zoom = 1;
  public search: string;
  public searchChanged: Subject<string> = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private _cdRef: ChangeDetectorRef,
  ) {
    // Exclude 2 tone icons
    // https://github.com/google/material-design-icons/issues/190
    const excludes = 'battery_20,battery_30,battery_50,battery_60,battery_80,battery_90,battery_charging_20,battery_charging_30,battery_charging_50,battery_charging_60,battery_charging_80,battery_charging_90,signal_cellular_0_bar,signal_cellular_1_bar,signal_cellular_2_bar,signal_cellular_3_bar,signal_cellular_connected_no_internet_0_bar,signal_cellular_connected_no_internet_1_bar,signal_cellular_connected_no_internet_2_bar,signal_cellular_connected_no_internet_3_bar,signal_wifi_0_bar,signal_wifi_1_bar_lock,signal_wifi_1_bar,signal_wifi_2_bar_lock,signal_wifi_2_bar,signal_wifi_3_bar_lock,signal_wifi_3_bar'.split(',');

    this.data.forEach(category => {
      category.icons.forEach((icon, index) => {
        if (excludes.indexOf(icon.id) >= 0) {
          category.icons.splice(index, 1);
        }
      });
    });
  }

  select(icon): void {
    this.dialogRef.close(icon);
  }

  ngOnInit() {
    this.searchChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(text => {
        this.search = text;
        if (!text.length) {
          this.categories = this.data;
          return;
        }

        text = text.toLocaleLowerCase();

        this.categories = [];
        this.data.forEach(category => {
          const icons = [];
          category.icons.forEach(icon => {
            if (icon.id.indexOf(text) >= 0) {
              icons.push(icon);
            }
          });
          const cat = clone(category);
          cat.icons = icons;
          if (icons.length) {
            this.categories.push(cat);
          }
        });

        this._cdRef.markForCheck();
      });
  }
}
