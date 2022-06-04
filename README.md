# NgOneTimePassword

[Storybook Demo](https://nvytychakdev.github.io/ng-one-time-password/)

## Installation

To install the package simply run:

```
npm i ng-one-time-password --save
```

Add `NgOneTimePasswordModule` to your app:

```
import { NgOneTimePasswordModule } from 'ng-one-time-password';

@NgModule({
  imports: [BrowserModule, FormsModule, NgOneTimePasswordModule],
})
export class AppModule {}
```

## Usage

Now we can import our component into the template. As it has form control support, there are two options to do so.

Simple `[(ngModel)]` way:

```
<ng-one-time-password
  [(ngModel)]="value"
  (ngModelChange)="onValueChange($event)"
></ng-one-time-password>
```

Or use angular reactive form control API:

```
<ng-one-time-password
  formControlName="otp-control"
></ng-one-time-password>
```

## API

| Name   |        Type         | Required | Default |                                   Description |
| ------ | :-----------------: | -------: | ------: | --------------------------------------------: |
| length |       number        |    false |       6 |             Defines one time password length. |
| type   | OneTimePasswordType |    false |  'text' | Defines input type for the one time password. |
