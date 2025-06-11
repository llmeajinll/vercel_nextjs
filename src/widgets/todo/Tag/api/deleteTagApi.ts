import axios from 'axios';

export const deleteTagApi = async (id: string) => {
    //   setVisible(false);
    return await axios
        .delete(`/api/todo/deleteTodoTag/${id}`)
        .then((res) => {
            console.log(res.data);
            return res.data
        })
        .catch((err) => {
            console.log(err);
        });
};