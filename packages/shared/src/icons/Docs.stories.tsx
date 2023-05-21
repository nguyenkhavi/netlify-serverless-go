//THIRD PARTY MODULES
import classcat from 'classcat';
//SHARED
import { Icons } from '_@shared/icons/Imports';
//TYPES MODULES
import type { Meta } from '@storybook/react';

const IconsDoc: Meta = {
  title: 'Atoms/Icons',
};
export default IconsDoc;

export const Docs = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
      {Object.keys(Icons).map((key) => {
        const Icon = Icons[key as keyof typeof Icons].icon;

        return (
          <div
            key={key}
            className={classcat([
              'grid justify-items-center gap-3',
              'rounded-lg bg-[#121212] p-5 shadow-md shadow-white/50',
            ])}
          >
            <Icon className="h-10 w-auto" />
            <div className="text-center">{key}</div>
          </div>
        );
      })}
    </div>
  );
};
