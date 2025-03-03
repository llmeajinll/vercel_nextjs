import axios from 'axios';

export const getTodoListApi = async () => {
  try {
    const result = await axios.get('/api/getTodoList');
    const {todo} = result.data;

    return todo;
  } catch (err) {
    console.log('client test: ', err);
    return [];
  }
};
