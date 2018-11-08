import { Component } from '@angular/core';
import { IconDialog } from 'fs-icon-picker';

@Component({
  selector: 'dialog-example',
  templateUrl: 'dialog-example.component.html'
})
export class DialogExampleComponent {
  public icon;
  constructor(private iconDialog: IconDialog) {}

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
