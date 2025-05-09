import axios from "axios";

export const postTagApi = async (data:{tag: string; color: string}) => {
    try {
        const result = await axios.post('/api/todo/putTodoTag', data).then(res => {
            console.log('putTodoTag.ts', res)
            return res.data
        });

        return result;

    } catch (err) {
        console.log('client test: ', err);
        return [];
    }
};