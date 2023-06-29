'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useRef } from 'react';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
//LAYOUT, COMPONENTS
import SearchInput from '_@shared/components/SearchInput';

export default function MainRight() {
  const searchText = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const _handleSearch = () => {
    router.push(`/community/search?keyword=${searchText.current?.value}`);
  };
  return (
    <div>
      <div>
        <SearchInput
          ref={searchText}
          name="search"
          type="text"
          placeholder="Search"
          className={classcat([
            'h-9  md:text-body1',
            'ow:border-[.5px] ow:border-text-10 ow:bg-secondary-300',
          ])}
          iconPosition="right"
          onKeyDown={(e: KeyboardEvent) => {
            e.key === 'Enter' && _handleSearch();
          }}
          onClickIcon={_handleSearch}
        />
      </div>
      <HomeAdvVertical
        className="relative h-auto w-full py-37 ow:top-4 ow:px-15 xl:grid"
        btnClasses="ow:static mt-2.5"
      />
    </div>
  );
}
