import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgOneTimePasswordModule } from '@ng-one-time-password/public-api';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgOneTimePasswordModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
