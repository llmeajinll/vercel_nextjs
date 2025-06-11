import { TagType } from '@/src/shared/types/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/app/store/store';
import {
    setMainTag, setTagModal, setDeleteTag
} from '@/src/app/store/slice';
import { deleteTagApi } from "@/src/widgets/todo/Tag/api/deleteTagApi";

interface TagProps {
    tagInfo: TagType;
}

export default function TagInModal({ tagInfo }: any) {
    // console.log(tagInfo);
    const status = useSelector((state: RootState) => state.counter.isShowTagModal);
    const dispatch = useDispatch();

    const onDeleteTag = async(e: React.MouseEvent<HTMLElement>) => {
        // @ts-ignore
        console.log('delete', e.target.id)
        // @ts-ignore
        await deleteTagApi(e.target.id).then(res => {
            console.log(res);
            if(res.deleteTag){
                dispatch(setDeleteTag(res.deleteTag))
                alert('태그가 삭제되었습니다.')
            }
            else{
                alert('태그를 삭제하는데 오류가 발생하였습니다.')
            }
        }).catch(err => {
            console.log(err);
            alert('태그를 삭제하는데 오류가 발생하였습니다.')
        })
    }

    const onClickTag = () => {
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
            <div id={tagInfo._id} className="ml-[5px] cursor-pointer" onClick={onDeleteTag}>✕</div>
        </div>
    );
}
