import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

/**
 * One-Time-Password Service.
 *
 * Provides business logic for one-time-password component management.
 *
 * @class
 */
@Injectable()
export class OneTimePasswordService {
  /**
   * Generate controls list.
   *
   * Method is used to generate angular form array with `length` amount of form controls.
   * This method should be executed all the time when one-time-password `length` changed.
   *
   * @param length - one-time-password length
   * @returns form array filled with required form controls
   *
   * @public
   */
  generateControls(length: number): FormArray<FormControl<string>> {
    const controls = [...Array(Number(length))].map(
      () => new FormControl<string>('', { nonNullable: true })
    );
    return new FormArray(controls);
  }

  /**
   * Is Numeric Value.
   *
   * Method used to validate provided control value for only numeric chars.
   *
   * @param value  - control input value
   * @returns is value a proper numeric string
   *
   * @public
   */
  isNumericValue(value: string): boolean {
    return /[0-9]+/.test(value);
  }

  /**
   * Is Text Value.
   *
   * Method used to validate provided control value for text characters.
   *
   * @param value - control input value
   * @returns is value a proper text string
   *
   * @public
   */
  isTextValue(value: string): boolean {
    return /[^\s]+/.test(value);
  }
}
