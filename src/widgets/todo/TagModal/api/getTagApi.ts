import axios from 'axios';

export const getTagApi = async () => {
    try {
        const result = await axios.get('/api/todo/getTodoTag').then(res => {
            console.log('getTagApi.ts', res)
            return res.data
        });


        return result;
    } catch (err) {
        console.log('client test: ', err);
        return [];
    }
};