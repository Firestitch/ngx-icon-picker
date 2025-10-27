import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconDialog } from '@firestitch/icon-picker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FsIconPickerComponent } from '../../../../src/app/components/fs-icon-picker/fs-icon-picker.component';


@Component({
    selector: 'picker',
    templateUrl: './picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        FsIconPickerComponent,
    ],
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
