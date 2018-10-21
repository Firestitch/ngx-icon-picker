import { Component } from '@angular/core';
import { IconDialog } from 'fs-icon-picker';

@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent {
  public icon;
  constructor(private iconDialog: IconDialog) {}

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
