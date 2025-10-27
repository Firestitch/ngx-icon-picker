import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { PickerComponent } from '../picker/picker.component';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, PickerComponent, DialogExampleComponent]
})
export class ExamplesComponent {
  public config = environment;
}
