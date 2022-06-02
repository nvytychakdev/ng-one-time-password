import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
   * Generate form group.
   *
   * Method is used to generate angular form group with `length` amount of form controls.
   * Each form control will get `'control-' + index` key assigned that can be used to identify the control.
   * This method should be executed all the time when one-time-password `length` changed.
   *
   * @param length - one-time-password length
   * @returns form group filled with required form controls
   *
   * @public
   */
  generateFormGroup(length: number): FormGroup {
    // get controls list
    const controls = [...Array(Number(length))].map(() => new FormControl());

    // build group from controls
    // assign `'control-' + index` control name
    const group = Object.entries(controls).reduce(
      (prev, [key, control]) => ({ ...prev, [`control-${key}`]: control }),
      {}
    );

    return new FormGroup(group);
  }
}
