import { TagType } from '@/src/shared/types/Todo';

interface TagProps {
  tagInfo: TagType;
}

export default function Tag({ tagInfo }: any) {
  console.log(tagInfo);

  const borderClass = tagInfo.color
    ? `border-${tagInfo.color}-600`
    : 'border-stone-600';
  const bgClass = tagInfo.color ? `bg-${tagInfo.color}-100` : 'bg-stone-100';
  const textClass = tagInfo.color
    ? `text-${tagInfo.color}-600`
    : 'text-stone-600';
  return (
    // <div
    //   className={`${borderClass} ${bgClass} ${textClass} flex items-center justify-center basis-[40px] px-1.5 py-0.5 rounded border`}
    // >
    <div
      className={`${borderClass} ${bgClass} ${textClass} flex items-center justify-center basis-[40px] px-1.5 py-0.5 rounded border`}
    >
      {tagInfo.tag || '없음'}
    </div>
  );
}
