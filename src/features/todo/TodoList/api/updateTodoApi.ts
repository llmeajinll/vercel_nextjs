import axios from "axios";

interface PropsType {
    id: string;
    content: string;
    read: boolean;
    setRead: React.Dispatch<React.SetStateAction<boolean>>;
}

export const updateTodoApi = async ({ id, content, read, setRead }: PropsType) => {
    console.log(id, content);
    const data = {id, content}
    console.log('[updateTodo data]', data)
    try{
        return await axios.patch(`/api/todo/updateTodo`, data).then(res => {
            console.log(res.data)
            setRead(!read);
        })
    }
    catch(err){
        alert('목록 업데이트에 실패하였습니다.')
    }

};
