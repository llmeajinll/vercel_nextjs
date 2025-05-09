import axios from 'axios';

export const getTodoListApi = async () => {
  try {
    const result = await axios.get('/api/todo/getTodolist').then(res => {
      console.log(res)
      return res.data
    });
    const {todo} = result;

    return todo;
  } catch (err) {
    console.log('client test: ', err);
    return [];
  }
};
