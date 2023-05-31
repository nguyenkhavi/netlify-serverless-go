'use client';

//THIRD PARTY MODULES
import { useMemo, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button'
import SearchInput from '_@shared/components/SearchInput'
import BaseSelect from '_@shared/components/select/BaseSelect'

const MOCK_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pfp', label: 'PFP' },
  { value: 'wildlife ', label: 'Wildlife' },
  { value: 'nature ', label: 'Nature' },
  { value: 'gaming ', label: 'Gaming' },
  { value: 'arts ', label: 'Arts' },
];

export default function Search() {
  const params = useParams();
  const router = useRouter();
  const searchText = useRef<HTMLInputElement>(null);

  const valueSelect = useMemo(() => {
    if (!params.category) return '';
    return params.category;
  }, [params.category]);

  const _handleChangeSelect = (value: string) => {
    router.push(`/marketplace/${value}`);
  };

  const _handleSearch = () => {
    console.log(searchText.current?.value);
  };

  return (
    <div className="flex px-[--px] py-4.5 md:py-4">
      <div className="w-full md:max-w-[633px]">
        <SearchInput
          ref={searchText}
          name="search"
          type="text"
          placeholder="Search products, brands, collection."
          className=" md:text-body1 ow:md:h-11.25"
        />
      </div>
      <BaseSelect
        name="category"
        placeholder="Category"
        owStyles={{ triggerClasses: 'ml-1 w-25.5 flex-shrink-0 lg:hidden md:h-11.25 md:flex-grow' }}
        options={MOCK_OPTIONS}
        defaultValue={valueSelect}
        onValueChange={_handleChangeSelect}
        seeMore={
          <div className="mt-7.5 text-center text-underline text-text-80 underline">See all</div>
        }
      />
      <Button className="ml-2 hidden p-0 ow:w-29.25 lg:block" onClick={_handleSearch}>
        Search
      </Button>
    </div>
  );
}
