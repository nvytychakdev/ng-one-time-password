import { Injectable } from '@angular/core';
import { Key, OneTimePasswordType } from '@ng-one-time-password/models';
import { InputService } from './input.service';

/**
 * Keyboard Service.
 *
 * Provides business logic for keyboard navigation over one-time-password inputs.
 *
 * @class
 */
@Injectable()
export class KeyboardService {
  /**
   * @param _input - input management service
   */
  constructor(private _input: InputService) {}

  /**
   * Handle key press event.
   *
   * Method used to handle keyboard navigation of the one-time-password component.
   * With left/right arrows focus is going to be shifted accordingly to the input siblings.
   * In case of Delete and Backspace buttons, if there was no value on input during delete event
   * default behavior is going to be prevented, and focus will be turned to a previous sibling.
   *
   * @param event - keyboard event
   *
   * @public
   */
  handleKeyPress(event: KeyboardEvent): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    switch (event.key) {
      // move focus backward for delete events
      // in case if value esists - default event should be applied
      case Key.DELETE:
        if (event.target.value) return;
        event.preventDefault();
        return this._input.focusInput(event.target.nextSibling);
      case Key.BACKSPACE:
        if (event.target.value) return;
        event.preventDefault();
        return this._input.focusInput(event.target.previousSibling);
      // left and right arrows are responsible for navigating between inputs
      case Key.ARROW_LEFT:
        if (event.shiftKey) return;
        return this._input.focusInput(event.target.previousSibling);
      case Key.ARROW_RIGHT:
        if (event.shiftKey) return;
        return this._input.focusInput(event.target.nextSibling);
    }

    // // clean existing input in case if it already has values
    // // to replace existing value in the input with a newly typed one
    if (
      /^[0-9a-zA-Z]$/.test(event.key) &&
      event.target.value &&
      !event.shiftKey &&
      !event.ctrlKey
    ) {
      event.target.value = '';
    }
  }
}
