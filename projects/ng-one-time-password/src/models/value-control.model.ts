import { ControlValueAccessor } from '@angular/forms';

/**
 * Custom On Change Callback.
 */
export type CustomOnChange = (value: unknown) => void;

/**
 * Custom On Touched Callback.
 */
export type CustomOnTouched = () => void;

/**
 * Value Control.
 *
 * Value control is used as components extension to provide
 * generic control value accessor functionality of the reactive form control.
 *
 * @example
 * ```
 * /@Component({
 *      providers: [
 *        {
 *          provide: NG_VALUE_ACCESSOR,
 *          useExisting: forwardRef(() => NgOneTimePasswordComponent),
 *          multi: true,
 *        },
 *      ],
 * })
 * export class MyComponent extends ValueControl<string> {}
 * ```
 *
 *
 * @class
 */
export class ValueControl<T> implements ControlValueAccessor {
  /**
   * Form control value.
   *
   * @protected
   */
  protected value?: T;

  /**
   * On Change.
   *
   * Default on change callback of form control change detection cycle.
   *
   * @public
   */
  onChange: CustomOnChange = () => {};

  /**
   * On Touched.
   *
   * Default on touched callback of form control change detection cycle.
   *
   * @public
   */
  onTouched: CustomOnTouched = () => {};

  /**
   * Write Value.
   *
   * Method used to handle value changes provided on form control init or due to `[(ngModel)]`.
   *
   * @param value - control value
   *
   * @public
   */
  writeValue(value: T): void {
    this.value = value;
  }

  /**
   * Register On Change.
   *
   * Method of the form control lifecycle used to register `onChange` callback.
   *
   * @param fn - custom on change method
   *
   * @public
   */
  registerOnChange(fn: CustomOnChange): void {
    this.onChange = fn;
  }

  /**
   * Register On Touched.
   *
   * Method of the form control lifecycle used to register `onTouched` callback.
   *
   * @param fn - custom on touched method
   *
   * @public
   */
  registerOnTouched(fn: CustomOnTouched): void {
    this.onTouched = fn;
  }
}
