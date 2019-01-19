import { Component } from '@angular/core';
import { IconDialog } from 'fs-icon-picker';

@Component({
  selector: 'picker',
  templateUrl: 'picker.component.html'
})
export class PickerComponent {
  public icon;
  public color = 'blue';
  constructor(private iconDialog: IconDialog) {

    setTimeout(() => {
        this.color = 'pink';
    },10000);

  }

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
