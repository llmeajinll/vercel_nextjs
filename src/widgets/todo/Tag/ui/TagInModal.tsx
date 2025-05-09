import { TagType } from '@/src/shared/types/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/app/store/store';
import {
    setMainTag, setTagModal
} from '@/src/app/store/slice';

interface TagProps {
    tagInfo: TagType;
}

export default function TagInModal({ tagInfo }: any) {
    // console.log(tagInfo);
    const status = useSelector((state: RootState) => state.counter.isShowTagModal);
    const dispatch = useDispatch();

    const onDeleteTag = () => {
        console.log('delete')
    }

    const onClickTag = () => {
        console.log(tagInfo)
        dispatch(setMainTag(tagInfo))
        dispatch(setTagModal(!status));
    }

    const borderClass = tagInfo.color
        ? `border-${tagInfo.color}-600`
        : 'border-stone-600';
    const bgClass = tagInfo.color ? `bg-${tagInfo.color}-100` : 'bg-stone-100';
    const textClass = tagInfo.color
        ? `text-${tagInfo.color}-600`
        : 'text-stone-600';

    return (

        <div
            className={`${borderClass} ${bgClass} ${textClass} flex items-center justify-center px-1.5 py-0.5 rounded border`}
        >
            <div className="cursor-pointer" onClick={onClickTag}>{tagInfo.tag || '없음'}</div>
            <div className="ml-[5px] cursor-pointer" onClick={onDeleteTag}>✕</div>
        </div>
    );
}
