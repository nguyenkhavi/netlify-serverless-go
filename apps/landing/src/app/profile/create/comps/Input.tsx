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
};

export const Root = (props: PropsWithChildren<Props>) => (
  <FormItem
    key={props.title}
    className={classcat([props.description ? 'ow:gap-4' : 'ow:gap-1.25'])}
    label={
      <div className="grid gap-1.25">
        <h5 className="title">{props.title}</h5>
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

export const Input = (props: Props & { inputProps?: ComponentProps<typeof FormInput> }) => (
  <FormInput
    tag={(props?.type || 'input') as TagInput}
    name={props.name}
    className={classcat([props?.type === 'textarea' ? 'input-md' : 'input-md'])}
    placeholder={props.placeholder}
    {...(props?.type === 'textarea'
      ? {
          rows: 4,
        }
      : {})}
    {...props.inputProps}
  />
);

function BaseInput(props: Props & { inputProps?: ComponentProps<typeof FormInput> }) {
  return (
    <Root {...props}>
      <Input {...props.inputProps} {...props} />
    </Root>
  );
}

export default BaseInput;
