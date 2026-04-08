import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTagList} from "@/src/app/store/slice";
import {RootState} from "@/src/app/store/store";
import {getTagApi} from "@/src/widgets/todo/TagModal/api/getTagApi";

export function useTag () {

    const dispatch = useDispatch();
    const tagList = useSelector((state: RootState) => state.counter.tagList);

    const getTagList = async() => {
        const {tag} = await getTagApi()
        if (tag) {
            dispatch(setTagList(tag))
        }
        else{
            console.log('error')
            dispatch(setTagList([]))
        }

    }

    useEffect(() => {
        getTagList()
    }, []);

    return { tagList }
}