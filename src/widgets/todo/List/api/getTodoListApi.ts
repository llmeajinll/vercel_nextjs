import axios from 'axios';

export const getTodoList = async () => {
  try {
    const result = await axios.get('/api/getTodoList');
    console.log(result.data.todo);
    return result.data.todo;
  } catch (err) {
    console.log('client test: ', err);
    return [];
  }
};
