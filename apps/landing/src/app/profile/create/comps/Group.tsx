//THIRD PARTY MODULES
import classcat from 'classcat';
import { cloneElement } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED

type Props = {
  underline?: boolean;
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
    <div className={classcat(['rounded-[10px] border border-text-10', props.className])}>
      <div
        className={classcat([
          'flex justify-between space-x-10 px-3.5 pb-1.5 pt-5 md:pl-9.5 md:pr-15',
          props.underline ? 'border-b border-text-10' : '',
        ])}
      >
        <div className="flex space-x-2.5">
          {props.icon &&
            cloneElement(icon, {
              className: classcat(['shrink-0', icon.props.className]),
            })}

          <div className="flex flex-col">
            <span className="text-h6">{props.title}</span>
            <span className="text-body2 text-text-50">{props.description}</span>
          </div>
        </div>

        <Show when={props.actionRender}>{props.actionRender}</Show>
      </div>
      <div className="px-3.5 md:pl-9.5 md:pr-15">{props.children}</div>
    </div>
  );
}
