import {
  AfterViewInit,
  ChangeDetectionStrategy, Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  InputType,
  OneTimePasswordType,
  ValueControl
} from '@ng-one-time-password/models';
import {
  InputService,
  KeyboardService,
  OneTimePasswordService
} from '@ng-one-time-password/services';
import { Subject, takeUntil } from 'rxjs';

/**
 * One-Time-Password Component.
 *
 * OTP component provides flexible way of management otp inputs.
 * Allows to define custom length and type of the input.
 *
 * @class
 * @extends ValueControl<string> - value control used to provide reactive form control functionality for component's extended class
 */
@Component({
  selector: 'ng-one-time-password',
  templateUrl: './ng-one-time-password.component.html',
  styleUrls: ['./ng-one-time-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgOneTimePasswordComponent),
      multi: true,
    },
  ],
})
export class NgOneTimePasswordComponent
  extends ValueControl<string>
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  /**
   * One-Time-Password controls length input.
   *
   * Used to generate proper amount of HTMLInput elements that are going to be used to provide value.
   *
   * @example
   * // Component template
   * <ng-one-time-password [length]="10"></ng-one-time-password>
   * 
   *
   * @default 6
   * @public
   */
  @Input() length = 6;

  /**
   * One-Time-Password controls type input.
   *
   * Used to specify expected type of the input from user.
   *
   * Possible values: `'text'`, `'password'`, `'number'`.
   *
   *
   * @example 
   * // Simple text input
   * <ng-one-time-password passwordType="text"></ng-one-time-password>
   * 
   * @example 
   * // Only numeric password allowed:
   * <ng-one-time-password passwordType="number"></ng-one-time-password>
   * 
   * @default 'text'
   * @public
   */
  @Input() type: OneTimePasswordType = OneTimePasswordType.TEXT;

  /**
   * One-Time-Password first input focus on init.
   * 
   * Used to set document focus for first otp input once form control is available.
   * Might be helpful on page load to focus input right away. 
   * 
   * @example 
   * // Masked input:
   * <ng-one-time-password [focusOnInit]="true"></ng-one-time-password>
   * 
   * @default false
   * @public 
   */
  @Input() focusOnInit = false;

  /**
   * One-Time-Password masked password input.
   * 
   * Used to set document focus for first otp input once form control is available.
   * Might be helpful on page load to focus input right away. 
   * 
   * @example 
   * // Masked input:
   * <ng-one-time-password [masked]="true"></ng-one-time-password>
   * 
   * @default false
   * @public 
   */
  @Input() masked = false;

  /**
   * One-Time-Password wrapper CSS class.
   * 
   * Used to define custom CSS class for inputs wrapper of the One-Time-Password component.
   * Might be helpful for defining custom styles from outside of the component.
   * 
   * @example 
   * // Masked input:
   * <ng-one-time-password wrapperClass="custom-css-class"></ng-one-time-password>
   * 
   * @default ''
   * @public 
   */

  @Input() wrapperClass: string | string[] = '';

  /**
   * One-Time-Password inputs CSS class.
   * 
   * Used to define custom CSS class for all inputs of the One-Time-Password component.
   * Might be helpful for defining custom styles from outside of the component.
   * 
   * @example 
   * // Masked input:
   * <ng-one-time-password inputClass="custom-css-class"></ng-one-time-password>
   * 
   * @default ''
   * @public 
   */
  @Input() inputClass: string = '';

  /**
   * One-Time-Password control wrapper.
   * 
   * Used to access DOM elements within the form control.
   * 
   * @default null
   * @publuc
   */
  @ViewChild('controlsWrapper', { static: false }) controlsWrapper: ElementRef | null = null;

  /**
   * Form controls group.
   *
   * Contains list of FormControl inputs for each segment of One-Time-Password code.
   * Control group used to track any controls changes to aggregate all inputs into the single emitted value of the component.
   *
   * @public
   */
  controlsGroup = new FormGroup({});

  /**
   * Form controls.
   *
   * Get an array of input controls for the One-Time-Password component.
   * Used to render list of the inputs, and also during value aggregation.
   *
   * @public
   */
  get controls(): AbstractControl[] {
    return Object.values(this.controlsGroup.controls);
  }

  /**
   * Input type.
   *
   * Provide HTMLInputElement type based on `masked` status of the component.
   *
   * @public
   */
  get inputType(): InputType {
    const type = this.type === OneTimePasswordType.NUMBER ? InputType.NUMBER : InputType.TEXT;
    return this.masked ? InputType.PASSWORD : type;
  }

  /**
   * Component destroy subject.
   *
   * Used by subscriptions to automatically unsubscribe once component gets destroyed.
   *
   * @private
   */
  private _$destroy = new Subject<boolean>();

  /**
   * Constructor is used to inject required services for component business logic management.
   *
   * @param _otp - one-time-password service
   * @param _keyboard - keyboard service
   * @param _input - input service
   *
   * @constructor
   */
  constructor(
    private _otp: OneTimePasswordService,
    private _keyboard: KeyboardService,
    private _input: InputService
  ) {
    super();
  }

  /**
   * Component init hook.
   *
   * On component init = controls are going to be setted up.
   * During the phase new form group will be created with a set of group controls
   * based on `length` of the one-time-password.
   *
   * @public
   */
  ngOnInit(): void {
    this._setupControls();
  }

  /**
   * Component changes hook.
   *
   * On component changes - `length` field is going to be verified.
   * If `length` of the one-time-password gets changed (not within initialization of the component)
   * controls are going to be setted up again. New form group with controls will be created based on new `length`.
   *
   * @param changes - simple component changes
   *
   * @public
   */
  ngOnChanges(changes: SimpleChanges): void {
    const passwordLength = changes['length'];

    if (
      passwordLength?.currentValue &&
      passwordLength.currentValue !== passwordLength?.previousValue &&
      !passwordLength.firstChange
    ) {
      this._setupControls();
    }
  }

  /**
   * Component view init.
   * 
   * Once all input elements is available on the view - after view init hook is used to provide
   * first input focus based on `focusOnInit` state of the component.
   * 
   * @public
   */
  ngAfterViewInit(): void {
    const wrapper = this.controlsWrapper?.nativeElement;
    if(this.focusOnInit && wrapper instanceof HTMLElement) {
      this._input.focusInput(wrapper.firstChild);
    }
  }

  /**
   * Component destroy hook.
   *
   * On component destroy - `_$destroy` subject value will be provided.
   * All subscribers that relied on this subject with `takeUntil(_$destroy)` will be destroyed.
   *
   * @public
   */
  ngOnDestroy(): void {
    this._$destroy.next(true);
  }

  /**
   * Input focus changes handler.
   *
   * Once input gets focused and it has some content - full content will be selected.
   * Used to simplify interaction with the inputs to delete/replace value once input gets revisited.
   *
   * @param event - focus event of the input with HTMLInputElement target.
   *
   * @public
   */
  onInputFocus(event: FocusEvent): void {
    if (!event?.target) return;
    if (event.target instanceof HTMLInputElement && !event.target?.value) return;
    this._input.selectInput(event.target);
  }

  /**
   * Input key down changes handler.
   *
   * Once keyboard key down event triggered within input - one-time-password keys handler will be executed.
   * This event used to provide keyboard support for one-time-password management.
   * Based on key this method is going to identify the behavior:
   * - arrow left : focus available left input sibling
   * - arrow right : focus available right input sibling
   * - delete or backspace : prevent default key press behavior for input with no value
   *
   * @param event - keyboard event
   */
  onInputKeyDown(event: KeyboardEvent): void {
    this._keyboard.handleKeyPress(event, this.type);
  }

  /**
   * Input changes handler.
   *
   * Once input gets changed - input handler will be executed.
   * This event used to provide validate input based on `type` and provide proper one-time-password interaction behavior.
   * 
   * @param event - input event
   *
   * @public
   */
  onInputChange(event: Event): void {
    this._input.handleInputChange(event);
  }

  /**
   * Input paste handler.
   *
   * Once paste event is triggered on any of the inputs - paste value is going to be retreived
   * from clipboard and set as one-time-password value. As soon as input pasted, last input will be taken in focus.
   *
   * @param event - clipboard event
   *
   * @public
   */
  onInputPaste(event: ClipboardEvent): void {
    const value = event.clipboardData?.getData('text');
    event.preventDefault();

    // set otp value from clipboard
    if (value?.length) {
      // prevent text paste into numeric field
      if (this.type === OneTimePasswordType.NUMBER && !/[0-9]+/g.test(value)) return;
      this._setValue(value);
    }

    // focus last input
    const [target, parent] = event.composedPath();
    if (parent instanceof HTMLElement) {
      this._input.focusInput(parent.lastElementChild);
    }
  }

  /**
   * Write control value.
   *
   * Method used to set initial value for angular form control or receive initial value of `[ngModel]`.
   * Within this method value is going to be applied for each input from controls list by char index.
   *
   * @param value - one-time-password value
   *
   * @override
   * @public
   */
  override writeValue(value: string): void {
    super.writeValue(value);
    if (value) {
      this._updateControls(value);
    }
  }

  /**
   * Value change.
   *
   * Method used to handle form control value changes.
   * During this method `this.value` is going to be updated and used for angular's reactive form
   * value changes detection cycle.
   *
   * @param value - one-time-password value
   *
   * @private
   */
  private _onValueChange(value?: string): void {
    this.value = value;
    this.onChange(value);
  }

  /**
   * Setup controls.
   *
   * Method used to create form group and generate form controls for code inputs
   * based on `length` of the one-time-password. Method is usually executed on component init
   * or during the changes that affects component's `length`.
   *
   * @private
   */
  private _setupControls(): void {
    // destroy any previous subscriptions
    this._$destroy.next(true);

    if (this.length > 0) {
      // get form group based on otp length
      this.controlsGroup = this._otp.generateFormGroup(this.length);

      // handle form group value changes
      this.controlsGroup.valueChanges
        .pipe(takeUntil(this._$destroy))
        .subscribe((controlsValue) => {
          const value = Object.values(controlsValue).join('').trim();
          this._setValue(value);
        });
    }
  }

  /**
   * Set value.
   *
   * Method used to update controls with new provided `value`.
   * Afterwards angular form changes cycle will be fired to provide this value to the reactive form.
   *
   * @param value - one-time-password value
   *
   * @private
   */
  private _setValue(value?: string): void {
    if (value) {
      this._updateControls(value);
    }

    this._onValueChange(value);
  }

  /**
   * Update controls value.
   *
   * Method used to set controls list value. Each control will get own value assigned based on
   * the char index of the `value` string.
   *
   * @param value - one-time-password value
   *
   * @private
   */
  private _updateControls(value: string): void {
    this.controls?.forEach((control, index) => {
      control.setValue(value[index], { onlySelf: true, emitEvent: false, });
    });
  }
}
