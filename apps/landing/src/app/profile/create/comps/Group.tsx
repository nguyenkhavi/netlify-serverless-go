//THIRD PARTY MODULES
import classcat from 'classcat';
import { cloneElement } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actionRender?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};
export default function Group(props: Props) {
  const icon = props.icon as any;
  return (
    <div
      className={classcat([
        'grid gap-1 rounded-[10px] border border-text-10 py-3.75 md:py-5.75',
        props.className,
      ])}
    >
      <div className={classcat(['flex justify-between space-x-6 px-3.75 md:px-5.75 '])}>
        <div className="flex space-x-2">
          {props.icon &&
            cloneElement(icon, {
              className: classcat(['shrink-0', icon.props.className]),
            })}

          <div className="flex flex-col space-y-1">
            <span className="text-h6">{props.title}</span>
            <span className="text-body2 text-text-50">{props.description}</span>
          </div>
        </div>

        <Show when={props.actionRender}>{props.actionRender}</Show>
      </div>
      <div className="px-3.75 md:px-5.75">{props.children}</div>
    </div>
  );
}
