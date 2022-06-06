import { Injectable } from '@angular/core';
import { InputEventType } from '@ng-one-time-password/models';

/**
 * Input Service.
 *
 * Provides business logic for managing inputs of one-time-password component.
 * Has utility classes which is used to focus/select inputs or handle input event changes.
 *
 * @class
 */
@Injectable()
export class InputService {
  /**
   * Focus input.
   *
   * Method used to set active focus for specified HTML input element.
   * It may be appliead for event targed or child node of any other event.
   *
   * @param sibling - sibling input used to apply focus for.
   *
   * @public
   */
  focusInput(sibling: EventTarget | ChildNode | null): void {
    if (this.isInputElement(sibling)) {
      return sibling.focus();
    }
  }

  /**
   * Select input.
   *
   * Method used to set active selection for specified HTML input element.
   * It may be appliead for event targed or child node of any other event.
   *
   * @param sibling - sibling input used to apply selection for.
   *
   * @public
   */
  selectInput(sibling: EventTarget | ChildNode | null): void {
    if (this.isInputElement(sibling)) {
      return sibling.select();
    }
  }

  /**
   * Is Input.
   *
   * Checks if provided `element` is actually `HTMLInputElement`.
   *
   * @param element - any HTML element
   * @returns is html element is input
   *
   * @public
   */
  isInputElement(
    element: EventTarget | ChildNode | HTMLElement | Element | null
  ): element is HTMLInputElement {
    return !!element && element instanceof HTMLInputElement;
  }

  /**
   * Handle input changes.
   *
   * Method used during input changes event.
   * Initially based on `type` input element will get additional behavior. For `'number'`
   * type of one-time-password only numeric values will be validated. In case if any other input provided
   * event is going to be stopped from propageting and default behavior will be prevented.
   *
   * If all requirements met properly, based on `event.inputType` focus is going to be shifted.
   * For `insertText` event focus is going to be changed to the next sibling.
   * For `deleteContentBackward` event focus is going to be changed to the previous sibling.
   *
   * @param event - input changes event
   * @param type - one-time-password type
   *
   * @public
   */
  handleInputChange(event: Event): void {
    if (!(event instanceof InputEvent) || !this.isInputElement(event.target)) {
      return;
    }

    // handle input event
    // on new value - next sibling should be focused
    // on delete value - previous sibling should be focused
    switch (event.inputType) {
      case InputEventType.INSERT_TEXT:
        //TODO: CHECK TEST CASES
        if (!event.target.value) return;
        return this.focusInput(event.target.nextSibling);
      case InputEventType.DELETE_CONTENT_BACKWARD:
        return this.focusInput(event.target.previousSibling);
    }
  }
}
