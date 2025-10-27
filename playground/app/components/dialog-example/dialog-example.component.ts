import { Component, inject } from '@angular/core';
import { IconDialog } from '@firestitch/icon-picker';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'dialog-example',
    templateUrl: 'dialog-example.component.html',
    standalone: true,
    imports: [MatButton, MatIcon]
})
export class DialogExampleComponent {
  private iconDialog = inject(IconDialog);

  public icon;

  public select() {
    this.iconDialog.open()
    .subscribe(icon => {
      this.icon = icon;
    });
  }
}
