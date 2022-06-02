/**
 * Input Event Type.
 *
 * Input event change types that are going to be used to handle input changes.
 * - `insertText` is used once text is added to the input
 * - `deleteContentBackward` is used once text is removed from the input
 *
 * @enum
 */
export enum InputEventType {
  INSERT_TEXT = 'insertText',
  DELETE_CONTENT_BACKWARD = 'deleteContentBackward',
}
