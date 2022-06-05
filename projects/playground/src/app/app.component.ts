import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OneTimePasswordType } from '@ng-one-time-password/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  control = new FormControl('');
  pwdLength = 6;
  pwdType = OneTimePasswordType.TEXT;
  isMasked = false;

  constructor() {
    this.control.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
