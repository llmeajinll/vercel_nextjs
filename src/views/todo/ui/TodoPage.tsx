import { Header } from '@/src/widgets/todo/Header';
import { Todo } from '@/src/widgets/todo/List';
import { Searchbar } from '@/src/widgets/todo/Searchbar';

export default function TodoPage() {
  return (
    <div className='w-[1080px] mx-auto'>
      <Header />
      <Searchbar />
      <Todo />
    </div>
  );
}
