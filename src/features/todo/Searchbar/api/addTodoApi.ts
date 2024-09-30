import axios from 'axios';

type DataType = {
  content: string;
  created_at: string;
  updated_at: string;
  tag: string;
};

export const addTodoApi = async (content: string) => {
  if (content.trim() === '') {
    alert('할 일을 입력해주세요.');
  } else {
    await axios
      .post(`/api/putTodo`, { content, tag: '일상' })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
