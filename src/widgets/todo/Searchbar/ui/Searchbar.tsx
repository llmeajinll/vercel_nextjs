import { SearchInput, TagButton } from '@/src/widgets/todo/Searchbar';

export default function Searchbar() {
  return (
    <div className='flex items-center w-[730px] h-10 border border-stone-300 rounded-full '>
      <div className='text-xl leading-8 w-fit mx-3 text-stone-600'>Do</div>
      <SearchInput />
      <TagButton />
    </div>
  );
}
