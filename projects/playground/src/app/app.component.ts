import { Component } from '@angular/core';
import { OneTimePasswordType } from '@ng-one-time-password/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = '';
  pwdLength = 6;
  pwdType = OneTimePasswordType.TEXT;

  onValueChange(value: string): void {
    console.log(value);
  }
}
