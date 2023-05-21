//RELATIVE MODULES
import Button from './Button';
//TYPES MODULES
import type { Meta } from '@storybook/react';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

export const Primary = {
  args: {},
};
