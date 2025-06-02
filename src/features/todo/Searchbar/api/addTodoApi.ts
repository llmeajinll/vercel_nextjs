import axios from 'axios';
import {ObjectId} from "mongodb";

type DataType = {
  content: string;
  created_at: string;
  updated_at: string;
  tag: string;
};

export const addTodoApi = async (data: {content: string; tag: string}) => {
  if (data.content.trim() === '') {
    alert('할 일을 입력해주세요.');
  } else {
    console.log(`addTodoApi content: ${data}`);
    const {content, tag} = data;
    await axios
      .post(`/api/todo/putTodo`, { content, tag })
      .then((res) => {
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  }
};
