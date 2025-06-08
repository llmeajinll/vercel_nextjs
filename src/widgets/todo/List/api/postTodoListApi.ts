import axios from 'axios';

export const postTodoListApi = async (content: { date:string }) => {
  console.log('content:', content)


    const data = {date: content}
    console.log('data', data)
  try {
    const result = await axios.post('/api/todo/postTodoList', data,
        {
          headers:{
              'Content-Type': 'application/json'
          }
        }).then(res => {
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
