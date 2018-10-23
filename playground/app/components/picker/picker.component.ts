import { Component } from '@angular/core';
import { IconDialog } from 'fs-icon-picker';

@Component({
  selector: 'picker',
  templateUrl: 'picker.component.html'
})
export class PickerComponent {
  public icon;
  constructor(private iconDialog: IconDialog) {}

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
