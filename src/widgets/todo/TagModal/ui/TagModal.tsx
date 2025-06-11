'use client'

import {TagInModal} from '../../Tag'
import {useEffect, useState} from "react";
import {TagColorButton} from '@/src/features/todo/TagModal';
import { TagType } from '@/src/shared/types/Todo';
import {postTagApi} from "../api/postTagApi";
import {useDispatch, useSelector} from "react-redux";
import { setTagList } from "@/src/app/store/slice";

export default function TagModal() {

    const [tag, setTag] = useState({tag: '', color: 'pink'});
    const tagList = useSelector((state:any) => state.counter.tagList);
    const dispatch = useDispatch();

    const colors = ['pink', 'red', 'orange',  'yellow', 'green', 'sky', 'blue', 'violet', 'purple', 'stone'];

    const onClickTagColor = (color:string) => {
        setTag((prev) => ({
            ...prev,
            color: color,
        }))
    }

    const onChangeTagContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag((prev) => ({
            ...prev,
            tag: e.target.value,
        }))
    }

    const onPressEnter = async(e:React.KeyboardEvent<HTMLInputElement>) => {

        if(e.key === 'Enter') {
            console.log(tag)
            const result = await postTagApi(tag);
            console.log(result)
            if(result.message === 'success'){
                console.log(result.content)
                dispatch(setTagList([result.content]))
                console.log(tagList)
            }
            else{
                alert('태그 생성에 실패하였습니다.')
            }

        }
    }

    useEffect(() => {
        // console.log("Modal tagList", tagList)
    }, [])

    return (
        <div className="absolute flex flex-col gap-2 w-[360px] p-[10px] bg-white border border-stone-300 top-12 right-[0px] z-10">
            <input placeholder="최대 5글자" onChange={onChangeTagContent} onKeyDown={onPressEnter} maxLength={5} className="border border-stone-300 rounded-full outline-none px-2 py-1 text-sm"/>
            <div className="w-full flex justify-between">
                {colors.map((color, index) => (
                    <TagColorButton color={color} status={tag.color === color} onClick={() => onClickTagColor(color)} key={index} />
                ))}

            </div>

            <div className={"w-full h-[1px] bg-stone-300"}></div>
            <div className="w-full flex flex-wrap gap-2">
                {tagList.map((tag:TagType) => (
                    <TagInModal tagInfo={tag} key={tag._id} />
                ))}
            </div>
        </div>
    );
}
