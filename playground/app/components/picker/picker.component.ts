import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconDialog } from '@firestitch/icon-picker';


@Component({
  selector: 'picker',
  templateUrl: './picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerComponent {

  public icon = undefined;
  public color = '#4678AE';

  constructor(
    private _iconDialog: IconDialog,
  ) {

    // setTimeout(() => {
    //     this.color = 'pink';
    // }, 10000);
  }

  public select() {
    this._iconDialog.open()
      .subscribe((icon) => {
        this.icon = icon;
      });
  }
}
