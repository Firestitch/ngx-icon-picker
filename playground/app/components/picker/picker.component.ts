import { Component } from '@angular/core';
import { IconDialog } from '@firestitch/icon-picker';


@Component({
  selector: 'picker',
  templateUrl: 'picker.component.html'
})
export class PickerComponent {
  public icon = 'face';
  public color = '#4678AE';

  constructor(private iconDialog: IconDialog) {

    // setTimeout(() => {
    //     this.color = 'pink';
    // }, 10000);
  }

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
