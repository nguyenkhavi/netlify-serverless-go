//THIRD PARTY MODULES
import classcat from 'classcat';
import { ComponentProps, PropsWithChildren } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import FormItem from '_@shared/components/FormItem';
import FormInput from '_@shared/components/FormInput';

type TagInput = 'input' | 'textarea';
type Props = {
  title?: string;
  description?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  labelClasses?: string;
};

export const Root = (props: PropsWithChildren<Props>) => (
  <FormItem
    key={props.title}
    labelClasses={props.labelClasses}
    label={
      <div className="grid gap-1">
        <h5 className="title">
          {props.title}
          {props.required && <span className="text-error">*</span>}
        </h5>
        <Show when={props.description}>
          <p className="description">{props.description}</p>
        </Show>
      </div>
    }
    name={props.name}
  >
    <>{props.children}</>
  </FormItem>
);

export const Input = (props: Props & { inputProps?: ComponentProps<typeof FormInput> }) => {
  const { className, ...inputProps } = props.inputProps || {};
  return (
    <FormInput
      tag={(props?.type || 'input') as TagInput}
      name={props.name}
      className={classcat([props?.type === 'textarea-md' ? '' : 'input-md', className])}
      placeholder={props.placeholder}
      {...inputProps}
    />
  );
};

function BaseInput(props: Props & { inputProps?: ComponentProps<typeof FormInput> }) {
  return (
    <Root {...props}>
      <Input {...props.inputProps} {...props} />
    </Root>
  );
}

export default BaseInput;
