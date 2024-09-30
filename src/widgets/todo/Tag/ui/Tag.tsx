import { TagType } from '@/src/shared/types/Todo';

interface TagProps {
  TagInfo: TagType;
}

export default function Tag({ tagInfo }: any) {
  // console.log(tagInfo.color);
  return (
    <div>
      <div
        className={`basis-[40px] px-1.5 py-0.5 rounded border 
            border-${tagInfo.color || 'stone'}-600 
            bg-${tagInfo.color || 'stone'}-100 
            text-${tagInfo.color || 'stone'}-600 
            flex items-center justify-center`}
      >
        {tagInfo.tag || '없음'}
      </div>
    </div>
  );
}
