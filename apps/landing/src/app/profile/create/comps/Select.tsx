//THIRD PARTY MODULES
import classcat from 'classcat';
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
};

export default function Select(props: Props) {
  return (
    <FormItem
      key={props.title}
      className={classcat([props.description ? 'ow:gap-4' : 'ow:gap-1.25'])}
      label={
        <div className="grid gap-1">
          <h5 className="title">{props.title}</h5>
          <Show when={props.description}>
            <p className="description">{props.description}</p>
          </Show>
        </div>
      }
      name={props.name}
    >
      <div className="grid gap-2">
        <FormSelect
          owStyles={{
            triggerClasses: 'ow:h-10.5 rounded-[7px]',
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
