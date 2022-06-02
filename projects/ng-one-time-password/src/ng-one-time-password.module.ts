import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOneTimePasswordComponent } from './components';
import {
  InputService,
  KeyboardService,
  OneTimePasswordService,
} from './services';

@NgModule({
  declarations: [NgOneTimePasswordComponent],
  providers: [OneTimePasswordService, KeyboardService, InputService],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [NgOneTimePasswordComponent],
})
export class NgOneTimePasswordModule {}
