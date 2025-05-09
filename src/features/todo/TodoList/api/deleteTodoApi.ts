import axios from 'axios';

export const deleteTodo = async (id: string) => {
  //   setVisible(false);
  await axios
    .delete(`/api/todo/deleteTodo/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
