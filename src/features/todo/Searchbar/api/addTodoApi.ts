import axios from 'axios';

type DataType = {
  content: string;
  created_at: string;
  updated_at: string;
  tag: string;
};

export const addTodoApi = async (content: string) => {
  await axios
    .post(`/api/putTodo`, { content, tag: '일상' })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
