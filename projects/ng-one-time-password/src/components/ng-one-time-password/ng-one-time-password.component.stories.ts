import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OneTimePasswordType,
  NgOneTimePasswordModule,
} from '@ng-one-time-password';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { NgOneTimePasswordComponent } from './ng-one-time-password.component';

export default {
  title: 'One Time Password',
  component: NgOneTimePasswordComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, NgOneTimePasswordModule],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div 
          style="
            height: 200px; 
            width: 100%; 
            display: flex; 
            justify-content: center; 
            align-items: center;
          ">
            ${story}
          </div>`
    ),
  ],
  argTypes: {
    registerOnTouched: {
      control: false,
    },
    registerOnChange: {
      control: false,
    },
    writeValue: {
      control: false,
    },
    onInputKeyDown: {
      control: false,
    },
    onInputPaste: {
      control: false,
    },
    onInputFocus: {
      control: false,
    },
    onInputChange: {
      control: false,
    },
    ngOnInit: {
      control: false,
    },
    ngOnDestroy: {
      control: false,
    },
    ngOnChanges: {
      control: false,
    },
    ngAfterViewInit: {
      control: false,
    },
    _updateControls: {
      control: false,
    },
    _setValue: {
      control: false,
    },
    _setupControls: {
      control: false,
    },
    _onValueChange: {
      control: false,
    },
    value: {
      control: false,
    },
    _$destroy: {
      control: false,
    },
    controlsGroup: {
      control: false,
    },
    onChange: {
      control: false,
    },
    onTouched: {
      control: false,
    },
    controlsWrapper: {
      control: false,
    },
    length: {
      control: {
        type: 'number',
      },
    },
    masked: {
      control: {
        type: 'boolean',
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'number'],
      },
    },
  },
  parameters: {
    controls: {
      exclude: [
        '_$destroy',
        'controlsList',
        'onChange',
        'onTouched',
        'controlsWrapper',
      ],
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'light-gray', value: '#b5b5b5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
} as Meta;

const Template: Story = (args) => {
  return {
    props: {
      ...args,
    },
  };
};

export const Default = Template.bind({});
Template.args = {
  length: 6,
  type: OneTimePasswordType.TEXT,
};
