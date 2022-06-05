import { FormControl } from '@angular/forms';

/**
 * One-Time-Password Type.
 *
 * - 'text' type is used for regular text input
 * - 'password' type is going to be used for hidden text input
 * - 'number' type is used for numeric values only (any literals are going to be ignored)
 *
 * @enum
 */
export enum OneTimePasswordType {
  TEXT = 'text',
  NUMBER = 'number',
}

/**
 * One Time Password Form Controls Group
 */
export interface OneTimePasswordGroup {
  [key: string]: FormControl<string>;
}
