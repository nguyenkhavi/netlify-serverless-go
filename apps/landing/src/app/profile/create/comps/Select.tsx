//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import FormItem from '_@shared/components/FormItem';
import FormSelect from '_@shared/components/FormSelect';

type Props = {
  title: string;
  description?: string;
  name: string;
  placeholder?: string;
  data: any;
  children?: React.ReactNode;
  required?: boolean;
  labelClasses?: string;
  selectProps?: Pick<React.ComponentProps<typeof FormSelect>, 'triggerRender'>;
};

export default function Select(props: Props) {
  return (
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
      <div className="grid gap-1">
        <FormSelect
          {...props.selectProps}
          owStyles={{
            triggerClasses: 'ow:h-16.25 rounded-lg ow:border-text-50',
          }}
          name={props.name}
          options={props.data}
          placeholder={props.placeholder}
        />
        {props.children}
      </div>
    </FormItem>
  );
}
