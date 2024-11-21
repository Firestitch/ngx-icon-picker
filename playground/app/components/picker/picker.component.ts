import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconDialog } from '@firestitch/icon-picker';


@Component({
  selector: 'picker',
  templateUrl: './picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerComponent {

  public icon = 'settings';
  public color = '#4678AE';

  constructor(
    private _iconDialog: IconDialog,
  ) {
  }

  public select() {
    this._iconDialog.open()
      .subscribe((icon) => {
        this.icon = icon;
      });
  }
}
