//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Switch from '@radix-ui/react-switch';
//RELATIVE MODULES
import './BaseSwitch.css';

export type BaseSwitchProps = { thumbClassName?: string } & Switch.SwitchProps;

const BaseSwitch = ({ className, thumbClassName, ...rest }: BaseSwitchProps) => (
  <Switch.Root
    className={classcat(['base-switch disabled:cursor-not-allowed disabled:opacity-50', className])}
    {...rest}
  >
    <Switch.Thumb className={thumbClassName || ''} />
  </Switch.Root>
);

export default BaseSwitch;
