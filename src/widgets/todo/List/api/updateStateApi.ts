import axios from 'axios';

interface PropsType {
  id: string;
  state: boolean;
}

export const updateState = async (id: string, state: boolean) => {
  //   console.log(`id: ${id}, state: ${state}`);s
  await axios
    .post(`/api/todo/updateState`, { id, state })
    .then((res) => {
      // console.log(res);
      const { todo } = res.data;
      return todo;
    })
    .catch((err) => console.error(err));
};
